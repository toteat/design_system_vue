package main

import (
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"sort"
	"strings"
	"sync"
)

// Holds the resolved paths used by the script
type Config struct {
	AssetDir   string
	OutputFile string
}

// Result of processing a single SVG file
type SVGResult struct {
	ConstName string
	IconName  string
	Content   string
}

// Determines the base directory for relative paths.
func getBaseDirectory() (string, error) {
	execPath, err := os.Executable()
	if err == nil {
		return filepath.Dir(execPath), nil
	}
	return os.Getwd() // Fallback to current working directory
}

// resolveAssetDir determines the final asset directory path based on common locations.
func resolveAssetDir(baseDir string) (string, error) {
	candidates := []string{
		filepath.Join(baseDir, "assets"),
		filepath.Join(baseDir, "src/components/Icon/assets"),
		"src/components/Icon/assets", // Relative to CWD if baseDir is CWD
		"assets",                     // Relative to CWD
	}
	for _, path := range candidates {
		if _, err := os.Stat(path); err == nil {
			return path, nil
		}
	}
	return "", fmt.Errorf("could not find assets directory. Common locations checked: %v", candidates)
}

// resolveOutputFile determines the final output file path based on assetDir.
func resolveOutputFile(baseDir string, assetDir string) (string, error) {
	// Default output location logic
	if strings.Contains(assetDir, "src/components/Icon") {
		return filepath.Join(filepath.Dir(assetDir), "icons.ts"), nil
	}
	return filepath.Join(baseDir, "icons.ts"), nil
}

// Resolves asset and output paths.
func resolveConfiguration() (Config, error) {
	baseDir, err := getBaseDirectory()
	if err != nil {
		return Config{}, fmt.Errorf("error getting base directory: %v", err)
	}

	resolvedAssetDir, err := resolveAssetDir(baseDir)
	if err != nil {
		return Config{}, err
	}

	resolvedOutputFile, err := resolveOutputFile(baseDir, resolvedAssetDir)
	if err != nil {
		return Config{}, fmt.Errorf("error resolving output file path: %v", err) // Added error check
	}

	return Config{AssetDir: resolvedAssetDir, OutputFile: resolvedOutputFile}, nil
}

// Reads and filters SVG files from the asset directory.
func readAndFilterSVGFiles(assetDir string) ([]os.DirEntry, error) {
	files, err := os.ReadDir(assetDir)
	if err != nil {
		return nil, fmt.Errorf("error reading directory %s: %v", assetDir, err)
	}

	var svgFiles []os.DirEntry
	for _, file := range files {
		if !file.IsDir() && strings.HasSuffix(file.Name(), ".svg") {
			svgFiles = append(svgFiles, file)
		}
	}

	if len(svgFiles) == 0 {
		fmt.Printf("Warning: No SVG files found in %s\n", assetDir)
		// It's not an error if no files are found, script can exit gracefully.
		// os.Exit(0) was here, but functions should generally not call os.Exit.
		// The caller (main) can decide to exit.
	}
	return svgFiles, nil
}

// Processes a single SVG file: reads, cleans, and generates names.
func processSVGFile(file os.DirEntry, assetDir string) (SVGResult, error) {
	filePath := filepath.Join(assetDir, file.Name())
	svgBytes, err := os.ReadFile(filePath)
	if err != nil {
		return SVGResult{}, fmt.Errorf("error reading file %s: %v", filePath, err)
	}

	if len(svgBytes) == 0 {
		fmt.Printf("Warning: Empty SVG file %s\n", filePath)
		return SVGResult{}, nil // Return empty result, not an error for empty file
	}

	svgContent := string(svgBytes)
	svgContent = strings.ReplaceAll(svgContent, "\n", "")
	svgContent = strings.ReplaceAll(svgContent, "\"", "'")

	baseName := strings.TrimSuffix(file.Name(), ".svg")
	baseName = strings.TrimPrefix(baseName, "icon-")

	iconName := baseName
	constName := "ICON_" + strings.ToUpper(strings.ReplaceAll(baseName, "-", "_"))

	return SVGResult{
		ConstName: constName,
		IconName:  iconName,
		Content:   svgContent,
	}, nil
}

// Generates the content for the icons.ts file, including constants and IconNames type.
func generateIconFileContent(svgFiles []os.DirEntry, assetDir string) (string, int, error) {
	numWorkers := runtime.NumCPU()
	fmt.Printf("Processing %d SVG files with %d workers\n", len(svgFiles), numWorkers)

	resultChan := make(chan SVGResult, len(svgFiles))
	var wg sync.WaitGroup
	semaphore := make(chan struct{}, numWorkers)

	for _, file := range svgFiles {
		wg.Add(1)
		go func(f os.DirEntry) {
			defer wg.Done()
			semaphore <- struct{}{}
			defer func() { <-semaphore }()

			result, err := processSVGFile(f, assetDir)
			if err != nil {
				fmt.Printf("Error processing file %s: %v\n", f.Name(), err)
				return
			}
			// Only send non-empty results (processSVGFile returns empty SVGResult for empty files)
			if result.ConstName != "" {
				resultChan <- result
			}
		}(file)
	}

	go func() {
		wg.Wait()
		close(resultChan)
	}()

	content := "// This file is auto-generated. Do not edit directly.\n\n"
	var iconNames []string
	resultCount := 0

	for result := range resultChan {
		content += fmt.Sprintf("export const %s = \"%s\";\n", result.ConstName, result.Content)
		iconNames = append(iconNames, result.IconName)
		resultCount++
	}

	sort.Strings(iconNames)

	if len(iconNames) > 0 {
		content += "\n// Icon type definition\nexport type IconNames =\n"
		for i, name := range iconNames {
			if i > 0 {
				content += "\n"
			}
			content += fmt.Sprintf("  | '%s'", name)
		}
		content += ";\n"
	}

	return content, resultCount, nil
}

// Writes the generated content to the output file.
func writeOutputToFile(outputFile, content string) error {
	outputDir := filepath.Dir(outputFile)
	if err := os.MkdirAll(outputDir, 0755); err != nil {
		return fmt.Errorf("error creating output directory %s: %v", outputDir, err)
	}
	return os.WriteFile(outputFile, []byte(content), 0644)
}

func main() {
	config, err := resolveConfiguration()
	if err != nil {
		fmt.Printf("Configuration error: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("Reading SVG files from: %s\n", config.AssetDir)
	fmt.Printf("Writing output to: %s\n", config.OutputFile)

	svgFiles, err := readAndFilterSVGFiles(config.AssetDir)
	if err != nil {
		fmt.Printf("Error reading SVG files: %v\n", err)
		os.Exit(1)
	}

	if len(svgFiles) == 0 {
		// If no SVG files were found, readAndFilterSVGFiles already printed a warning.
		// We can write an empty icons.ts file or just exit.
		// Writing an empty file might be preferable to keep the build process consistent.
		fmt.Println("No SVG files to process. Writing an empty icons file.")
		emptyContent := "// This file is auto-generated. Do not edit directly.\n// No icons found.\n"
		if err := writeOutputToFile(config.OutputFile, emptyContent); err != nil {
			fmt.Printf("Error writing empty output file: %v\n", err)
			os.Exit(1)
		}
		fmt.Printf("Successfully generated empty %s\n", config.OutputFile)
		os.Exit(0)
	}

	content, resultCount, err := generateIconFileContent(svgFiles, config.AssetDir)
	if err != nil {
		fmt.Printf("Error generating icon file content: %v\n", err)
		os.Exit(1)
	}

	if err := writeOutputToFile(config.OutputFile, content); err != nil {
		fmt.Printf("Error writing output file: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("Successfully generated %s with %d icon constants and IconNames type\n", config.OutputFile, resultCount)
}
