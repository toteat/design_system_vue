import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  extractTokens,
  categorizeTokens,
  generateTokensFile,
  TOKEN_CATEGORIES,
} from '../lib/extract-tokens.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../../');
const SOURCE_FILE = resolve(ROOT, 'src/style.css');

const cssSource = readFileSync(SOURCE_FILE, 'utf-8');

describe('extractTokens', () => {
  it('extracts tokens from the real style.css', () => {
    const tokens = extractTokens(cssSource);
    expect(tokens.length).toBeGreaterThan(50);
  });

  it('all token names start with --', () => {
    const tokens = extractTokens(cssSource);
    for (const t of tokens) {
      expect(t.name).toMatch(/^--/);
    }
  });

  it('all tokens have non-empty values', () => {
    const tokens = extractTokens(cssSource);
    for (const t of tokens) {
      expect(t.value).toBeTruthy();
    }
  });

  it('adds descriptions for known tokens', () => {
    const tokens = extractTokens(cssSource);
    const primary = tokens.find((t) => t.name === '--color-primary');
    expect(primary?.description).toBe('Brand primary red');
  });

  it('extracts from a minimal CSS snippet', () => {
    const css = `.root { --color-test: #fff; --spacing-sm: 0.5rem; }`;
    const tokens = extractTokens(css);
    expect(tokens).toHaveLength(2);
    expect(tokens[0]).toEqual({ name: '--color-test', value: '#fff' });
    expect(tokens[1]).toEqual({
      name: '--spacing-sm',
      value: '0.5rem',
      description: '8px',
    });
  });

  it('returns empty array for CSS without custom properties', () => {
    expect(extractTokens('.root { color: red; }')).toEqual([]);
  });
});

describe('categorizeTokens', () => {
  it('groups tokens into 4 categories', () => {
    const tokens = extractTokens(cssSource);
    const categories = categorizeTokens(tokens);
    expect(Object.keys(categories)).toEqual([...TOKEN_CATEGORIES]);
  });

  it('puts --color-* in colors', () => {
    const categories = categorizeTokens([
      { name: '--color-primary', value: '#ff4235' },
    ]);
    expect(categories.colors).toHaveLength(1);
    expect(categories.typography).toHaveLength(0);
  });

  it('puts --text-* in typography', () => {
    const categories = categorizeTokens([{ name: '--text-sm', value: '14px' }]);
    expect(categories.typography).toHaveLength(1);
  });

  it('puts --radius-* in radius', () => {
    const categories = categorizeTokens([
      { name: '--radius-sm', value: '0.25rem' },
    ]);
    expect(categories.radius).toHaveLength(1);
  });

  it('puts --spacing-* in spacing', () => {
    const categories = categorizeTokens([
      { name: '--spacing-xs', value: '0.25rem' },
    ]);
    expect(categories.spacing).toHaveLength(1);
  });

  it('categorizes all real tokens without losing any', () => {
    const tokens = extractTokens(cssSource);
    const categories = categorizeTokens(tokens);
    const total = Object.values(categories).reduce(
      (sum, arr) => sum + arr.length,
      0,
    );
    expect(total).toBe(tokens.length);
  });

  it('real source has expected category counts', () => {
    const tokens = extractTokens(cssSource);
    const categories = categorizeTokens(tokens);
    expect(categories.colors.length).toBeGreaterThanOrEqual(30);
    expect(categories.typography.length).toBeGreaterThanOrEqual(10);
    expect(categories.radius.length).toBeGreaterThanOrEqual(5);
    expect(categories.spacing.length).toBeGreaterThanOrEqual(5);
  });
});

describe('generateTokensFile', () => {
  it('generates valid TypeScript output', () => {
    const output = generateTokensFile(cssSource);
    expect(output).toContain('export type TokenCategory');
    expect(output).toContain('export type Token');
    expect(output).toContain('export const TOKENS');
  });

  it('includes all category names in the type union', () => {
    const output = generateTokensFile(cssSource);
    for (const cat of TOKEN_CATEGORIES) {
      expect(output).toContain(`'${cat}'`);
    }
  });

  it('produces output that matches the current generated file', () => {
    const generated = generateTokensFile(cssSource);
    const currentFile = readFileSync(
      resolve(__dirname, '../../src/data/tokens.ts'),
      'utf-8',
    );
    expect(generated).toBe(currentFile);
  });
});
