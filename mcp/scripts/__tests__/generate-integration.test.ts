import { describe, it, expect } from 'vitest';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MCP_ROOT = resolve(__dirname, '../../');

describe('npm run generate (integration)', () => {
  it('runs without errors', () => {
    const result = execSync('npm run generate', {
      cwd: MCP_ROOT,
      encoding: 'utf-8',
      timeout: 30_000,
    });
    expect(result).toContain('Written');
  });

  it('produces a valid icons.ts with exports', () => {
    const content = readFileSync(
      resolve(MCP_ROOT, 'src/data/icons.ts'),
      'utf-8',
    );
    expect(content).toContain('export type IconCategory');
    expect(content).toContain('export const ICONS_BY_CATEGORY');
    expect(content).toContain('export const ALL_ICONS');
    // Must have icon entries
    expect(content).toMatch(/'[a-z]+-[a-z]+-?[a-z]*'/);
  });

  it('produces a valid tokens.ts with exports', () => {
    const content = readFileSync(
      resolve(MCP_ROOT, 'src/data/tokens.ts'),
      'utf-8',
    );
    expect(content).toContain('export type TokenCategory');
    expect(content).toContain('export type Token');
    expect(content).toContain('export const TOKENS');
    // Must have token entries
    expect(content).toMatch(/--color-primary/);
    expect(content).toMatch(/--text-sm/);
    expect(content).toMatch(/--radius-/);
    expect(content).toMatch(/--spacing-/);
  });

  it('produces a valid components.ts with exports', () => {
    const content = readFileSync(
      resolve(MCP_ROOT, 'src/data/components.ts'),
      'utf-8',
    );
    expect(content).toContain('export type PropDef');
    expect(content).toContain('export type ComponentDef');
    expect(content).toContain('export const COMPONENTS');
    expect(content).toContain('export const COMPONENT_MAP');
  });

  it('generated components.ts contains all 24 components', () => {
    const content = readFileSync(
      resolve(MCP_ROOT, 'src/data/components.ts'),
      'utf-8',
    );
    const expected = [
      'Button',
      'Card',
      'Checkbox',
      'Accordion',
      'TextInput',
      'Select',
      'Multiselect',
      'Tab',
      'GroupedButtons',
      'DropdownButton',
      'Table',
      'Radio',
      'Tooltip',
      'Icon',
      'Spinner',
      'SkeletonPreload',
      'ImagePreview',
      'DropZone',
      'Overlay',
      'OverlayMessage',
      'LogoToteat',
      'BackgroundWrapper',
      'TreeItem',
      'TreeList',
    ];
    for (const name of expected) {
      expect(content).toContain(`name: '${name}'`);
    }
  });

  it('generated files compile with tsc', () => {
    const result = execSync('npm run build', {
      cwd: MCP_ROOT,
      encoding: 'utf-8',
      timeout: 30_000,
    });
    // tsc outputs nothing on success
    expect(result).toBeDefined();
  });

  it('generated data passes the existing data tests', () => {
    const result = execSync('npx vitest run src/__tests__/data.test.ts', {
      cwd: MCP_ROOT,
      encoding: 'utf-8',
      timeout: 30_000,
    });
    expect(result).toContain('passed');
    expect(result).not.toContain('failed');
  });
});
