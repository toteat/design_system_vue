import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  extractIconNames,
  categorize,
  groupByCategory,
  generateIconsFile,
  CATEGORY_ORDER,
} from '../lib/extract-icons.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../../');
const SOURCE_FILE = resolve(ROOT, 'src/components/Icon/icons.ts');

const source = readFileSync(SOURCE_FILE, 'utf-8');

describe('extractIconNames', () => {
  it('extracts icon names from ICON_* exports', () => {
    const names = extractIconNames(source);
    expect(names.length).toBeGreaterThan(100);
  });

  it('converts UPPER_SNAKE to kebab-case', () => {
    const names = extractIconNames(source);
    for (const name of names) {
      expect(name).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('includes known icons', () => {
    const names = extractIconNames(source);
    expect(names).toContain('close-outline');
    expect(names).toContain('chevron-down-outline');
    expect(names).toContain('apple-filled');
  });

  it('extracts from a minimal snippet', () => {
    const snippet = `
      export const ICON_FOO_BAR = ["<path/>", "0 0 16 16"];
      export const ICON_BAZ = ["<path/>", "0 0 24 24"];
    `;
    const names = extractIconNames(snippet);
    expect(names).toEqual(['foo-bar', 'baz']);
  });

  it('returns empty array for source without ICON_ exports', () => {
    expect(extractIconNames('const x = 1;')).toEqual([]);
  });
});

describe('categorize', () => {
  it('categorizes arrow icons', () => {
    expect(categorize('arrow-down-outline')).toBe('arrows');
    expect(categorize('chevron-left-outline')).toBe('arrows');
  });

  it('categorizes navigation icons', () => {
    expect(categorize('home-outline')).toBe('navigation');
    expect(categorize('search-outline')).toBe('navigation');
    expect(categorize('layout-1-outline')).toBe('navigation');
  });

  it('categorizes ui-controls icons', () => {
    expect(categorize('checkbox-checked')).toBe('ui-controls');
    expect(categorize('close-outline')).toBe('ui-controls');
    expect(categorize('pencil')).toBe('ui-controls');
    expect(categorize('delete-outline')).toBe('ui-controls');
  });

  it('categorizes commerce icons', () => {
    expect(categorize('money-bill-outline')).toBe('commerce');
    expect(categorize('shopping-cart-outline')).toBe('commerce');
  });

  it('categorizes food-health icons', () => {
    expect(categorize('apple-filled')).toBe('food-health');
    expect(categorize('carrot-filled')).toBe('food-health');
  });

  it('falls back to other for unknown prefixes', () => {
    expect(categorize('unknown-icon')).toBe('other');
  });
});

describe('groupByCategory', () => {
  it('groups icons into categories', () => {
    const names = ['arrow-down-outline', 'close-outline', 'apple-filled'];
    const grouped = groupByCategory(names);
    expect(grouped.get('arrows')).toEqual(['arrow-down-outline']);
    expect(grouped.get('ui-controls')).toEqual(['close-outline']);
    expect(grouped.get('food-health')).toEqual(['apple-filled']);
  });

  it('sorts icons within categories', () => {
    const names = [
      'chevron-down-outline',
      'arrow-down-outline',
      'arrow-up-outline',
    ];
    const grouped = groupByCategory(names);
    const arrows = grouped.get('arrows') ?? [];
    expect(arrows).toEqual([...arrows].sort());
  });

  it('groups all source icons without losing any', () => {
    const names = extractIconNames(source);
    const grouped = groupByCategory(names);
    const total = Array.from(grouped.values()).reduce(
      (sum, arr) => sum + arr.length,
      0,
    );
    expect(total).toBe(names.length);
  });
});

describe('generateIconsFile', () => {
  it('generates valid TypeScript output', () => {
    const names = extractIconNames(source);
    const output = generateIconsFile(names);
    expect(output).toContain('export type IconCategory');
    expect(output).toContain('export const ICONS_BY_CATEGORY');
    expect(output).toContain('export const ALL_ICONS');
  });

  it('includes all category names', () => {
    const output = generateIconsFile(['arrow-down-outline']);
    for (const cat of CATEGORY_ORDER) {
      expect(output).toContain(`'${cat}'`);
    }
  });

  it('produces output that matches the current generated file', () => {
    const names = extractIconNames(source);
    const generated = generateIconsFile(names);
    const currentFile = readFileSync(
      resolve(__dirname, '../../src/data/icons.ts'),
      'utf-8',
    );
    expect(generated).toBe(currentFile);
  });
});
