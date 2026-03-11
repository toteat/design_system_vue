import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { COMPONENTS, COMPONENT_MAP } from '../data/components.js';
import { TOKENS } from '../data/tokens.js';
import type { TokenCategory } from '../data/tokens.js';
import { ALL_ICONS, ICONS_BY_CATEGORY } from '../data/icons.js';

export function registerTools(server: McpServer): void {
  // List all components
  server.registerTool(
    'list_components',
    {
      description:
        'List all 24 components in @toteat-eng/design-system-vue with their descriptions',
      inputSchema: {},
    },
    async () => ({
      content: [
        {
          type: 'text' as const,
          text: COMPONENTS.map((c) => `**${c.name}**: ${c.description}`).join(
            '\n',
          ),
        },
      ],
    }),
  );

  // Get component API
  server.registerTool(
    'get_component_api',
    {
      description:
        'Get the full API (props, events, slots) for a specific component',
      inputSchema: {
        componentName: z
          .string()
          .describe('Component name (e.g. Button, TextInput, Select)'),
      },
    },
    async ({ componentName }) => {
      const component = COMPONENT_MAP.get(componentName.toLowerCase());
      if (!component) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `Component "${componentName}" not found.\n\nAvailable components:\n${COMPONENTS.map((c) => c.name).join(', ')}`,
            },
          ],
          isError: true,
        };
      }

      const lines: string[] = [
        `# ${component.name}`,
        `${component.description}`,
        '',
        '## Import',
        `\`\`\`ts`,
        `import { ${component.name} } from '@toteat-eng/design-system-vue/${component.name}'`,
        `\`\`\``,
        '',
      ];

      if (component.props.length > 0) {
        lines.push('## Props');
        for (const prop of component.props) {
          const required = prop.required ? ' *(required)*' : '';
          const def = prop.default ? ` — default: \`${prop.default}\`` : '';
          const desc = prop.description ? ` — ${prop.description}` : '';
          lines.push(
            `- **${prop.name}**${required}: \`${prop.type}\`${def}${desc}`,
          );
        }
        lines.push('');
      }

      if (component.events.length > 0) {
        lines.push('## Events');
        for (const event of component.events) {
          const desc = event.description ? ` — ${event.description}` : '';
          lines.push(`- **${event.name}**: \`${event.payload}\`${desc}`);
        }
        lines.push('');
      }

      if (component.slots.length > 0) {
        lines.push('## Slots');
        for (const slot of component.slots) {
          const desc = slot.description ? ` — ${slot.description}` : '';
          lines.push(`- **${slot.name}**${desc}`);
        }
      }

      return {
        content: [{ type: 'text' as const, text: lines.join('\n') }],
      };
    },
  );

  // Search icons
  server.registerTool(
    'search_icons',
    {
      description:
        'Search icons by keyword. Returns matching icon names from the icon library.',
      inputSchema: {
        query: z
          .string()
          .describe('Search keyword (e.g. close, arrow, check, user)'),
      },
    },
    async ({ query }) => {
      const q = query.toLowerCase();
      const matches = ALL_ICONS.filter((icon) => icon.includes(q));

      if (matches.length === 0) {
        // Find icons in each category that partially match
        const suggestions: string[] = [];
        for (const [cat, icons] of Object.entries(ICONS_BY_CATEGORY)) {
          const catMatches = icons.filter((icon) =>
            icon.split('-').some((word) => word.includes(q)),
          );
          if (catMatches.length > 0)
            suggestions.push(`${cat}: ${catMatches.join(', ')}`);
        }
        return {
          content: [
            {
              type: 'text' as const,
              text:
                suggestions.length > 0
                  ? `No exact matches for "${query}". Partial matches:\n${suggestions.join('\n')}`
                  : `No icons found matching "${query}". Use list_components to browse all icons by category.`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: 'text' as const,
            text: `Icons matching "${query}":\n${matches.join('\n')}`,
          },
        ],
      };
    },
  );

  // Get tokens by category
  server.registerTool(
    'get_tokens',
    {
      description: 'Get CSS design tokens for a specific category',
      inputSchema: {
        category: z
          .enum(['colors', 'typography', 'radius', 'spacing'])
          .describe('Token category'),
      },
    },
    async ({ category }) => {
      const tokens = TOKENS[category as TokenCategory];
      const lines = tokens.map((t) => {
        const desc = t.description ? ` /* ${t.description} */` : '';
        return `${t.name}: ${t.value};${desc}`;
      });
      return {
        content: [
          {
            type: 'text' as const,
            text: `/* ${category} tokens */\n.tot-ds-root {\n  ${lines.join('\n  ')}\n}`,
          },
        ],
      };
    },
  );

  // Generate component usage
  server.registerTool(
    'generate_usage',
    {
      description:
        'Generate a Vue 3 code snippet for using a design system component',
      inputSchema: {
        componentName: z
          .string()
          .describe('Component name (e.g. Button, TextInput)'),
        props: z
          .record(z.string())
          .optional()
          .describe('Props to pass (key-value pairs)'),
        slot: z.string().optional().describe('Default slot content'),
      },
    },
    async ({ componentName, props, slot }) => {
      const component = COMPONENT_MAP.get(componentName.toLowerCase());
      if (!component) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `Component "${componentName}" not found. Available: ${COMPONENTS.map((c) => c.name).join(', ')}`,
            },
          ],
          isError: true,
        };
      }

      const name = component.name;
      const propAttrs = props
        ? Object.entries(props)
            .map(([k, v]) => {
              const propDef = component.props.find((p) => p.name === k);
              const isBoolean =
                propDef?.type === 'boolean' || v === 'true' || v === 'false';
              const isNumber = propDef?.type === 'number';
              if (isBoolean || isNumber) return `  :${k}="${v}"`;
              return `  ${k}="${v}"`;
            })
            .join('\n')
        : '';

      const slotContent = slot ? `\n  ${slot}\n` : '';
      const openTag = propAttrs ? `<${name}\n${propAttrs}\n>` : `<${name}>`;
      const closeTag = `</${name}>`;
      const template =
        component.slots.length > 0 || slot
          ? `${openTag}${slotContent}${closeTag}`
          : `${openTag.replace('>', ' />')}`;

      const importPath = `@toteat-eng/design-system-vue/${name}`;
      const code = [
        `<script setup lang="ts">`,
        `import { ${name} } from '${importPath}'`,
        `</script>`,
        ``,
        `<template>`,
        `  ${template}`,
        `</template>`,
      ].join('\n');

      return {
        content: [
          { type: 'text' as const, text: `\`\`\`vue\n${code}\n\`\`\`` },
        ],
      };
    },
  );
}
