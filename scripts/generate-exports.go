package main

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"sync"
)

type ExportConfig struct {
	Types   string `json:"types"`
	Import  string `json:"import"`
	Require string `json:"require"`
}

// OrderedMap preserves the order of keys in a JSON object
type OrderedMap struct {
	Order []string
	Map   map[string]interface{}
}

func (om *OrderedMap) UnmarshalJSON(b []byte) error {
	if err := json.Unmarshal(b, &om.Map); err != nil {
		return err
	}
	om.Order = make([]string, 0, len(om.Map))
	for k := range om.Map {
		om.Order = append(om.Order, k)
	}
	return nil
}

func (om OrderedMap) MarshalJSON() ([]byte, error) {
	buf := make([]byte, 0, 1024)
	buf = append(buf, '{')
	for i, k := range om.Order {
		if i > 0 {
			buf = append(buf, ',')
		}
		// Marshal key
		key, err := json.Marshal(k)
		if err != nil {
			return nil, err
		}
		buf = append(buf, key...)
		buf = append(buf, ':')
		// Marshal value
		val, err := json.Marshal(om.Map[k])
		if err != nil {
			return nil, err
		}
		buf = append(buf, val...)
	}
	buf = append(buf, '}')
	return buf, nil
}

func main() {
	// Get the root directory
	rootDir, err := os.Getwd()
	if err != nil {
		fmt.Printf("❌ Error getting current directory: %v\n", err)
		os.Exit(1)
	}

	// Define paths
	componentsDir := filepath.Join(rootDir, "src", "components")
	packageJSONPath := filepath.Join(rootDir, "package.json")

	// Read package.json
	packageJSONData, err := os.ReadFile(packageJSONPath)
	if err != nil {
		fmt.Printf("❌ Error reading package.json: %v\n", err)
		os.Exit(1)
	}

	// Get all component directories
	components, err := getComponentDirectories(componentsDir)
	if err != nil {
		fmt.Printf("❌ Error reading components directory: %v\n", err)
		os.Exit(1)
	}

	// Generate exports configuration
	exports := make(map[string]interface{})

	// Add main entry point
	exports["."] = ExportConfig{
		Types:   "./dist/index.d.ts",
		Import:  "./dist/design-system-vue.es.js",
		Require: "./dist/design-system-vue.umd.js",
	}

	// Add style.css
	exports["./style.css"] = "./dist/design-system-vue.css"

	// Use a WaitGroup to handle concurrent component processing
	var wg sync.WaitGroup
	exportsChan := make(chan struct {
		key   string
		value ExportConfig
	}, len(components))

	// Process components concurrently
	for _, component := range components {
		wg.Add(1)
		go func(comp string) {
			defer wg.Done()
			exportsChan <- struct {
				key   string
				value ExportConfig
			}{
				key: "./" + comp,
				value: ExportConfig{
					Types:   fmt.Sprintf("./dist/%s/index.d.ts", comp),
					Import:  fmt.Sprintf("./dist/%s/index.js", comp),
					Require: "./dist/design-system-vue.umd.js",
				},
			}
		}(component)
	}

	// Close channel when all goroutines are done
	go func() {
		wg.Wait()
		close(exportsChan)
	}()

	// Collect results from channel
	for export := range exportsChan {
		exports[export.key] = export.value
	}

	// Convert exports to JSON
	exportsJSON, err := json.MarshalIndent(exports, "    ", "  ")
	if err != nil {
		fmt.Printf("❌ Error formatting exports: %v\n", err)
		os.Exit(1)
	}

	// Read the original package.json as a string
	packageJSONStr := string(packageJSONData)

	// Find the exports section
	exportsStart := strings.Index(packageJSONStr, `"exports":`)
	if exportsStart == -1 {
		fmt.Printf("❌ Could not find exports section in package.json\n")
		os.Exit(1)
	}

	// Find the start of the exports object
	exportsStart = strings.Index(packageJSONStr[exportsStart:], "{") + exportsStart
	if exportsStart == -1 {
		fmt.Printf("❌ Could not find start of exports object\n")
		os.Exit(1)
	}

	// Find the end of the exports object
	exportsEnd := exportsStart
	depth := 0
	for i := exportsStart; i < len(packageJSONStr); i++ {
		if packageJSONStr[i] == '{' {
			depth++
		} else if packageJSONStr[i] == '}' {
			depth--
			if depth == 0 {
				exportsEnd = i + 1
				break
			}
		}
	}

	// Replace the exports section
	newPackageJSON := packageJSONStr[:exportsStart] + string(exportsJSON) + packageJSONStr[exportsEnd:]

	// Write back to package.json
	if err := os.WriteFile(packageJSONPath, []byte(newPackageJSON), 0644); err != nil {
		fmt.Printf("❌ Error writing package.json: %v\n", err)
		os.Exit(1)
	}

	fmt.Println("✅ Package.json exports updated successfully!")
	fmt.Printf("📦 Components exported: %s\n", strings.Join(components, ", "))
}

func getComponentDirectories(dir string) ([]string, error) {
	var components []string

	entries, err := os.ReadDir(dir)
	if err != nil {
		return nil, err
	}

	for _, entry := range entries {
		if entry.IsDir() {
			components = append(components, entry.Name())
		}
	}

	return components, nil
}
