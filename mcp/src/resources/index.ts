import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { COMPONENTS, COMPONENT_MAP } from '../data/components.js';
import { TOKENS } from '../data/tokens.js';
import { ICONS_BY_CATEGORY } from '../data/icons.js';

export function registerResources(server: McpServer): void {
  // List all components
  server.registerResource(
    'components',
    'design-system://components',
    {
      title: 'Design System Components',
      description: 'All components with names and descriptions',
      mimeType: 'application/json',
    },
    async () => ({
      contents: [
        {
          uri: 'design-system://components',
          mimeType: 'application/json',
          text: JSON.stringify(
            COMPONENTS.map((c) => ({
              name: c.name,
              description: c.description,
            })),
            null,
            2,
          ),
        },
      ],
    }),
  );

  // Component detail (dynamic)
  const componentTemplate = new ResourceTemplate(
    'design-system://components/{name}',
    { list: undefined },
  );
  server.registerResource(
    'component-detail',
    componentTemplate,
    {
      title: 'Component API',
      description: 'Full props, events, and slots for a component',
      mimeType: 'application/json',
    },
    async (uri, { name }) => {
      const componentName = Array.isArray(name) ? name[0] : name;
      if (!componentName) {
        return {
          contents: [
            {
              uri: uri.href,
              mimeType: 'text/plain',
              text: 'Component name is required.',
            },
          ],
        };
      }
      const component = COMPONENT_MAP.get(componentName.toLowerCase());
      if (!component) {
        return {
          contents: [
            {
              uri: uri.href,
              mimeType: 'text/plain',
              text: `Component "${componentName}" not found. Available: ${COMPONENTS.map((c) => c.name).join(', ')}`,
            },
          ],
        };
      }
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: 'application/json',
            text: JSON.stringify(component, null, 2),
          },
        ],
      };
    },
  );

  // Design tokens
  server.registerResource(
    'tokens',
    'design-system://tokens',
    {
      title: 'Design Tokens',
      description:
        'All CSS custom properties (colors, typography, spacing, radius)',
      mimeType: 'application/json',
    },
    async () => ({
      contents: [
        {
          uri: 'design-system://tokens',
          mimeType: 'application/json',
          text: JSON.stringify(TOKENS, null, 2),
        },
      ],
    }),
  );

  // Icons
  server.registerResource(
    'icons',
    'design-system://icons',
    {
      title: 'Icon Library',
      description: 'Icons organized by category',
      mimeType: 'application/json',
    },
    async () => ({
      contents: [
        {
          uri: 'design-system://icons',
          mimeType: 'application/json',
          text: JSON.stringify(ICONS_BY_CATEGORY, null, 2),
        },
      ],
    }),
  );

  // Shared TypeScript types
  server.registerResource(
    'types',
    'design-system://types',
    {
      title: 'Shared TypeScript Types',
      description:
        'Variant, ThemeColor, ComponentSize, ButtonSize, and other shared types',
      mimeType: 'application/json',
    },
    async () => ({
      contents: [
        {
          uri: 'design-system://types',
          mimeType: 'application/json',
          text: JSON.stringify(
            {
              Variant: [
                'outline',
                'outline-gray',
                'primary',
                'secondary',
                'text',
                'neutral-dark',
              ],
              ComponentSize: [
                'tiny',
                'small',
                'medium',
                'large',
                'very-large',
                'very-very-large',
                'ridiculously-large',
              ],
              ButtonSize: ['tiny', 'small', 'medium', 'large'],
              ThemeColor: [
                'primary',
                'primary-light',
                'secondary',
                'secondary-light',
                'tertiary',
                'tertiary-light',
                'white',
                'black',
                'neutral',
                'neutral-50',
                'neutral-100',
                'neutral-200',
                'neutral-300',
                'neutral-400',
                'neutral-500',
                'gray-100',
                'gray-200',
                'gray-300',
                'gray-400',
                'gray-500',
                'blue',
                'blue-light',
                'green',
                'green-light',
                'yellow',
                'yellow-light',
                'red',
                'red-light',
                'unset',
              ],
              TextInputValidationState: [
                'default',
                'success',
                'warning',
                'error',
              ],
              OverlayPlacement: ['top', 'center', 'bottom'],
              TooltipPosition: ['top', 'bottom', 'left', 'right'],
              TabSelectedColor: [
                'primary',
                'secondary',
                'tertiary',
                'neutral-100',
              ],
            },
            null,
            2,
          ),
        },
      ],
    }),
  );
}
