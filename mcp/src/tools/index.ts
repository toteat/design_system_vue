import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { COMPONENTS, COMPONENT_MAP } from '../data/components.js';
import { TOKENS } from '../data/tokens.js';
import type { TokenCategory } from '../data/tokens.js';
import { ALL_ICONS } from '../data/icons.js';

/**
 * Maps custom type aliases to their allowed string values.
 * Used by generate_usage to validate prop values at generation time.
 */
const RESOLVED_TYPES: Record<string, string[]> = {
  Variant: [
    'outline',
    'outline-gray',
    'primary',
    'secondary',
    'text',
    'neutral-dark',
  ],
  ButtonSize: ['tiny', 'small', 'medium', 'large'],
  ButtonVariant: [
    'outline',
    'outline-gray',
    'primary',
    'secondary',
    'text',
    'neutral-dark',
  ],
  ButtonGroupPosition: ['left', 'center', 'right', 'standalone'],
  TextInputType: [
    'text',
    'password',
    'email',
    'search',
    'tel',
    'url',
    'number',
    'date',
  ],
  TextInputInputMode: [
    'text',
    'email',
    'search',
    'tel',
    'url',
    'none',
    'numeric',
    'decimal',
  ],
  TextInputSize: ['small', 'medium', 'large'],
  TextInputValidationState: ['default', 'success', 'warning', 'error'],
  LogoToteatMode: ['icon', 'complete'],
  LogoToteatVariant: ['original', 'cream-orange', 'black-cream'],
};

/**
 * Returns the allowed values for a prop type, or null if not a union type.
 * Handles both RESOLVED_TYPES lookup and inline union types like '"left" | "right"'.
 * Returns null for truncated unions (containing "... N more ...") since the
 * allow-list would be incomplete and cause false validation errors.
 */
function getAllowedValues(propType: string): string[] | null {
  if (RESOLVED_TYPES[propType]) return RESOLVED_TYPES[propType];

  const unionMatch = propType.match(/^"[^"]+"/);
  if (unionMatch) {
    // Skip truncated unions — incomplete allow-lists cause false rejections
    if (/\.\.\.\s*\d+\s*more\s*\.\.\./.test(propType)) return null;
    return [...propType.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  }
  return null;
}

export function registerTools(server: McpServer): void {
  // List all components
  server.registerTool(
    'list_components',
    {
      description: `List all ${COMPONENTS.length} components in @toteat-eng/design-system-vue with their descriptions`,
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
          const allowed = getAllowedValues(prop.type);
          const valuesHint = allowed
            ? ` — values: ${allowed.map((a) => `\`'${a}'\``).join(', ')}`
            : '';
          lines.push(
            `- **${prop.name}**${required}: \`${prop.type}\`${def}${valuesHint}${desc}`,
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
        return {
          content: [
            {
              type: 'text' as const,
              text: `No icons found matching "${query}". Try a different keyword or read the design-system://icons resource to browse all icons by category.`,
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

      // Validate prop values against known types
      if (props) {
        const errors: string[] = [];
        for (const [k, v] of Object.entries(props)) {
          const propDef = component.props.find((p) => p.name === k);
          if (!propDef) {
            errors.push(
              `Unknown prop "${k}" on ${name}. Available props: ${component.props.map((p) => p.name).join(', ')}`,
            );
            continue;
          }
          const allowed = getAllowedValues(propDef.type);
          if (allowed && !allowed.includes(v)) {
            errors.push(
              `Invalid value "${v}" for prop "${k}" (type: ${propDef.type}). Allowed values: ${allowed.map((a) => `'${a}'`).join(', ')}`,
            );
          }
        }
        if (errors.length > 0) {
          return {
            content: [
              {
                type: 'text' as const,
                text: `Validation errors:\n${errors.map((e) => `- ${e}`).join('\n')}`,
              },
            ],
            isError: true,
          };
        }
      }

      const propAttrs = props
        ? Object.entries(props)
            .map(([k, v]) => {
              const propDef = component.props.find((p) => p.name === k);
              const isBoolean = propDef?.type === 'boolean';
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
          : `${openTag.replace(/>$/, ' />')}`;

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
