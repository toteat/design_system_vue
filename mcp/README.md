# Toteat Design System MCP Server

MCP (Model Context Protocol) server that exposes the `@toteat-eng/design-system-vue` API to AI assistants. Provides component documentation, design tokens, icon search, and code generation — so the AI always uses the correct props, events, and tokens.

## Install

### 1. Clone and build

```bash
git clone https://github.com/toteat/design_system_vue.git
cd design_system_vue/mcp
npm install
npm run generate   # sync data from source (icons, tokens, components)
npm run build      # compile TypeScript
```

Take note of the absolute path to `dist/index.js` — you'll need it for configuration:

```bash
echo "$(pwd)/dist/index.js"
```

### 2. Configure your AI tool

Choose your provider below. In all examples, replace `/path/to/design_system_vue` with the actual path from step 1.

---

#### Claude Code (CLI)

**Option A — CLI command (recommended):**

```bash
claude mcp add toteat-design-system -- node /path/to/design_system_vue/mcp/dist/index.js
```

This saves the config locally. To share it with your team, add `--scope project`:

```bash
claude mcp add --scope project toteat-design-system -- node /path/to/design_system_vue/mcp/dist/index.js
```

**Option B — Manual config:**

Create `.mcp.json` in your project root:

```json
{
  "mcpServers": {
    "toteat-design-system": {
      "command": "node",
      "args": ["/path/to/design_system_vue/mcp/dist/index.js"]
    }
  }
}
```

**Verify:** Start a new Claude Code session. Run `claude mcp list` to confirm the server appears.

**Useful commands:**

```bash
claude mcp list                    # list configured servers
claude mcp get toteat-design-system  # show server config
claude mcp remove toteat-design-system  # remove server
```

---

#### Cursor

Create `.cursor/mcp.json` in your project root (or `~/.cursor/mcp.json` for global config):

```json
{
  "mcpServers": {
    "toteat-design-system": {
      "command": "node",
      "args": ["/path/to/design_system_vue/mcp/dist/index.js"]
    }
  }
}
```

You can also add it via **Cursor Settings > MCP** tab.

> MCP tools are only available in Cursor's **Agent mode**, not in normal chat.

---

#### Windsurf

Edit the Windsurf MCP config file:

- **macOS:** `~/.codeium/windsurf/mcp_config.json`
- **Windows:** `%USERPROFILE%\.codeium\windsurf\mcp_config.json`

```json
{
  "mcpServers": {
    "toteat-design-system": {
      "command": "node",
      "args": ["/path/to/design_system_vue/mcp/dist/index.js"]
    }
  }
}
```

You can also access this file from Windsurf: **Cascade sidebar > Hammer icon > Configure**.

Restart Windsurf after editing.

---

#### VS Code + GitHub Copilot

> Requires VS Code 1.99+ with Copilot in Agent Mode.

Create `.vscode/mcp.json` in your project root:

```json
{
  "servers": {
    "toteat-design-system": {
      "type": "stdio",
      "command": "node",
      "args": ["/path/to/design_system_vue/mcp/dist/index.js"]
    }
  }
}
```

> **Important:** VS Code uses `"servers"` as the root key, not `"mcpServers"`.

You can also add servers via **Command Palette > MCP: Add Server**.

---

#### Claude Desktop

Edit the Claude Desktop config file:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

You can also access it via **Settings > Developer > Edit Config**.

```json
{
  "mcpServers": {
    "toteat-design-system": {
      "command": "node",
      "args": ["/path/to/design_system_vue/mcp/dist/index.js"]
    }
  }
}
```

**Fully quit and restart** Claude Desktop after editing.

---

### Quick reference

| Provider | Config file | Root key | CLI available |
|----------|------------|----------|---------------|
| Claude Code | `.mcp.json` | `mcpServers` | `claude mcp add` |
| Cursor | `.cursor/mcp.json` | `mcpServers` | `agent mcp` |
| Windsurf | `~/.codeium/windsurf/mcp_config.json` | `mcpServers` | No |
| VS Code + Copilot | `.vscode/mcp.json` | **`servers`** | No |
| Claude Desktop | `~/Library/.../claude_desktop_config.json` | `mcpServers` | No |

## Tools

### `list_components`

Lists all 24 components with their descriptions.

**Example prompt:** *"What components are available in the design system?"*

### `get_component_api`

Returns the full API (props, events, slots) for a specific component, including import path, types, defaults, and descriptions.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `componentName` | string | yes | Component name (e.g. `Button`, `TextInput`, `Select`) |

**Example prompt:** *"Show me the API for the Select component"*

### `search_icons`

Searches the icon library by keyword. Returns matching icon names.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | yes | Search keyword (e.g. `close`, `arrow`, `check`) |

**Example prompt:** *"Find me an icon for closing something"*

### `get_tokens`

Returns CSS design tokens for a specific category.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `category` | `colors` \| `typography` \| `radius` \| `spacing` | yes | Token category |

**Example prompt:** *"What color tokens are available?"*

### `generate_usage`

Generates a ready-to-use Vue 3 `<script setup>` snippet for a component.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `componentName` | string | yes | Component name |
| `props` | object | no | Key-value pairs of props to include |
| `slot` | string | no | Default slot content |

**Example prompt:** *"Generate code for a primary Button with text 'Save'"*

## Resources

The server also exposes MCP resources for clients that support them:

| URI | Description |
|-----|-------------|
| `design-system://components` | All components (name + description) |
| `design-system://components/{name}` | Full API for a specific component |
| `design-system://tokens` | All CSS design tokens |
| `design-system://icons` | Icons organized by category |
| `design-system://types` | Shared TypeScript types (Variant, ThemeColor, etc.) |

## HTTP Mode

The server runs in stdio mode by default. For HTTP-based integrations:

```bash
npm run start:http                     # default port 3333
node dist/index.js --http --port 8080  # custom port
```

Endpoint: `POST http://127.0.0.1:3333/mcp`

For providers that support HTTP transport, use this config instead:

```json
{
  "mcpServers": {
    "toteat-design-system": {
      "url": "http://localhost:3333/mcp"
    }
  }
}
```

## Adding a New Component

When a new component is added to the design system, 3 steps are needed to expose it in the MCP:

### 1. Add descriptions to `scripts/descriptions.json`

Props, events, and slots are auto-extracted from the source code, but **descriptions and defaults must be added manually**. Add a new entry keyed by component name:

```json
{
  "MyComponent": {
    "description": "Short description of what it does and how to use it",
    "propDefaults": {
      "size": "'medium'",
      "disabled": "false"
    },
    "props": {
      "modelValue": "v-model binding — the current value",
      "size": "Component size variant"
    },
    "events": {
      "change": "Fired when the value changes"
    },
    "slots": {
      "default": "Main content"
    }
  }
}
```

**What goes where:**

| Field | Purpose | Required |
|-------|---------|----------|
| `description` | Component-level description — shown in `list_components` and `get_component_api` | Yes |
| `propDefaults` | Default values for props (as strings, e.g. `"'medium'"`, `"false"`) | Recommended |
| `props` | Human-readable description for each prop | Recommended |
| `events` | Description for each event | If events exist |
| `slots` | Description for each slot (include scoped slot bindings) | If slots exist |
| `manualEvents` | Array of `{ name, payload, description }` for events that can't be auto-detected | Rare — only for dynamic event names |

**Tips for good descriptions:**
- Start with what the component **does**, not what it **is** ("Expandable section with animation" not "An accordion component")
- Mention gotchas upfront ("No default slot — use `text` prop", "Events are prefixed with instanceName")
- For v-model props, specify the binding name ("v-model:selectedTab")
- For complex prop types, show the object shape ("{ value: string, label: string }")
- For scoped slots, document the scope ("scoped: { item: TreeItemData, level: number }")

### 2. Register the component name

Add the component name to the `COMPONENT_NAMES` array in `scripts/generate-components.ts`:

```ts
export const COMPONENT_NAMES = [
  'Button', 'Card', /* ... existing ... */ 'MyComponent',
];
```

### 3. Regenerate and build

```bash
cd mcp
npm run generate
npm run build
npm test           # verify everything passes
```

### Prompt for generating descriptions

If you want an AI assistant to help write the descriptions, use this prompt:

```
Read the Vue component at src/components/{ComponentName}/{ComponentName}.vue
and its types in src/types/index.d.ts.

Generate a JSON entry for mcp/scripts/descriptions.json with:
- "description": A concise description (1-2 sentences) of what the component does
  and any important usage notes (gotchas, required patterns, etc.)
- "propDefaults": All props that have default values in withDefaults(),
  as strings (e.g. "'medium'", "false", "'center'")
- "props": Description for every prop that isn't self-explanatory.
  For v-model props, specify the binding name.
  For complex types, show the object shape.
- "events": Description for every emitted event.
  Mention what triggers it and what the payload contains.
- "slots": Description for every slot.
  For scoped slots, document the scope bindings.

Follow the existing format in mcp/scripts/descriptions.json.
```

## Keeping Data in Sync

When components, icons, or tokens change in the design system, regenerate the MCP data:

```bash
cd /path/to/design_system_vue/mcp
npm run generate   # runs all 3 sync scripts
npm run build      # recompile
```

Individual sync commands:

```bash
npm run sync:icons       # sync from src/components/Icon/icons.ts
npm run sync:tokens      # sync from src/style.css
npm run sync:components  # sync from src/types/index.d.ts + .vue files
```

## Development

```bash
npm run dev          # watch mode (recompile on changes)
npm test             # run all tests (84 tests)
npm run test:watch   # watch mode
```

## Example Prompts

Once configured, you can ask your AI assistant things like:

```
"Using the toteat-design-system MCP, create a form with:
 - A TextInput for email
 - A Select for role (options: admin, user, viewer)
 - A Button to submit"

"What icon should I use for a delete action?"

"Show me all the spacing tokens"

"What props does the Overlay component accept?"
```
