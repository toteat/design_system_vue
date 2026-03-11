import { describe, it, expect, beforeEach } from 'vitest';
import { registerTools } from '../tools/index.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ToolHandler = (
  args: any,
) => Promise<{ content: { type: string; text: string }[]; isError?: boolean }>;

function createMockServer(): {
  getHandler: (name: string) => ToolHandler;
  registerTool: (...args: unknown[]) => void;
} {
  const handlers = new Map<string, ToolHandler>();
  return {
    registerTool: (name: unknown, _config: unknown, handler: unknown) => {
      handlers.set(name as string, handler as ToolHandler);
    },
    getHandler: (name: string) => {
      const h = handlers.get(name);
      if (!h) throw new Error(`Tool "${name}" not registered`);
      return h;
    },
  };
}

describe('list_components tool', () => {
  let server: ReturnType<typeof createMockServer>;

  beforeEach(() => {
    server = createMockServer();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerTools(server as any);
  });

  it('lists all 24 components', async () => {
    const result = await server.getHandler('list_components')({});
    expect(result.content[0].text).toContain('Button');
    expect(result.content[0].text).toContain('TextInput');
    expect(result.content[0].text).toContain('TreeList');
  });
});

describe('get_component_api tool', () => {
  let server: ReturnType<typeof createMockServer>;

  beforeEach(() => {
    server = createMockServer();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerTools(server as any);
  });

  it('returns full API for a known component', async () => {
    const result = await server.getHandler('get_component_api')({
      componentName: 'Button',
    });
    expect(result.isError).toBeUndefined();
    expect(result.content[0].text).toContain('## Props');
    expect(result.content[0].text).toContain(
      "import { Button } from '@toteat-eng/design-system-vue/Button'",
    );
  });

  it('is case-insensitive', async () => {
    const result = await server.getHandler('get_component_api')({
      componentName: 'button',
    });
    expect(result.isError).toBeUndefined();
    expect(result.content[0].text).toContain('# Button');
  });

  it('returns error for unknown component', async () => {
    const result = await server.getHandler('get_component_api')({
      componentName: 'FakeComponent',
    });
    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('not found');
  });
});

describe('search_icons tool', () => {
  let server: ReturnType<typeof createMockServer>;

  beforeEach(() => {
    server = createMockServer();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerTools(server as any);
  });

  it('finds icons matching a keyword', async () => {
    const result = await server.getHandler('search_icons')({ query: 'close' });
    expect(result.content[0].text).toContain('close');
  });

  it('returns a "no match" message for an unknown query', async () => {
    const result = await server.getHandler('search_icons')({
      query: 'zzznomatch',
    });
    expect(result.content[0].text).toMatch(/No (exact matches|icons found)/);
  });
});

describe('get_tokens tool', () => {
  let server: ReturnType<typeof createMockServer>;

  beforeEach(() => {
    server = createMockServer();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerTools(server as any);
  });

  it('returns colors tokens', async () => {
    const result = await server.getHandler('get_tokens')({
      category: 'colors',
    });
    expect(result.content[0].text).toContain('colors tokens');
    expect(result.content[0].text).toContain('--');
  });

  it('returns spacing tokens', async () => {
    const result = await server.getHandler('get_tokens')({
      category: 'spacing',
    });
    expect(result.content[0].text).toContain('spacing tokens');
  });
});

describe('generate_usage tool', () => {
  let server: ReturnType<typeof createMockServer>;

  beforeEach(() => {
    server = createMockServer();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerTools(server as any);
  });

  it('generates a Vue snippet with correct import', async () => {
    const result = await server.getHandler('generate_usage')({
      componentName: 'Button',
    });
    expect(result.isError).toBeUndefined();
    expect(result.content[0].text).toContain(
      "import { Button } from '@toteat-eng/design-system-vue/Button'",
    );
    expect(result.content[0].text).toContain('<script setup');
  });

  it('renders string props as plain attributes', async () => {
    const result = await server.getHandler('generate_usage')({
      componentName: 'Button',
      props: { text: 'Click me', variant: 'primary' },
    });
    expect(result.content[0].text).toContain('text="Click me"');
  });

  it('renders boolean props with : binding', async () => {
    const result = await server.getHandler('generate_usage')({
      componentName: 'Button',
      props: { disabled: 'true' },
    });
    expect(result.content[0].text).toContain(':disabled="true"');
  });

  it('renders self-closing tag for components with no slots', async () => {
    const result = await server.getHandler('generate_usage')({
      componentName: 'Button',
    });
    expect(result.content[0].text).toContain('<Button />');
  });

  it('renders open/close tags for components with slots', async () => {
    const result = await server.getHandler('generate_usage')({
      componentName: 'Card',
    });
    expect(result.content[0].text).toContain('</Card>');
  });

  it('returns error for unknown component', async () => {
    const result = await server.getHandler('generate_usage')({
      componentName: 'FakeComponent',
    });
    expect(result.isError).toBe(true);
  });
});
