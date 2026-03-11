import { describe, it, expect } from 'vitest';
import { COMPONENTS, COMPONENT_MAP } from '../data/components.js';
import { TOKENS } from '../data/tokens.js';
import { ALL_ICONS, ICONS_BY_CATEGORY } from '../data/icons.js';

describe('components data', () => {
  it('has 24 components', () => {
    expect(COMPONENTS).toHaveLength(24);
  });

  it('every component has name, description, and array fields', () => {
    for (const c of COMPONENTS) {
      expect(c.name).toBeTruthy();
      expect(c.description).toBeTruthy();
      expect(Array.isArray(c.props)).toBe(true);
      expect(Array.isArray(c.events)).toBe(true);
      expect(Array.isArray(c.slots)).toBe(true);
    }
  });

  it('COMPONENT_MAP stores all components with lowercase keys', () => {
    expect(COMPONENT_MAP.size).toBe(24);
    for (const c of COMPONENTS) {
      expect(COMPONENT_MAP.get(c.name.toLowerCase())).toBe(c);
    }
  });

  it('Button has no default slot (uses text prop instead)', () => {
    const button = COMPONENT_MAP.get('button');
    expect(button?.slots).toHaveLength(0);
  });

  it('Button has text and variant props', () => {
    const button = COMPONENT_MAP.get('button');
    const propNames = button?.props.map((p) => p.name) ?? [];
    expect(propNames).toContain('text');
    expect(propNames).toContain('variant');
  });

  it('Accordion has default and label slots', () => {
    const accordion = COMPONENT_MAP.get('accordion');
    const slotNames = accordion?.slots.map((s) => s.name) ?? [];
    expect(slotNames).toContain('default');
    expect(slotNames).toContain('label');
  });

  it('Tab has tab-click event', () => {
    const tab = COMPONENT_MAP.get('tab');
    const eventNames = tab?.events.map((e) => e.name) ?? [];
    expect(eventNames).toContain('tab-click');
  });

  it('Table has cell-{key} slot but no row-click event', () => {
    const table = COMPONENT_MAP.get('table');
    const slotNames = table?.slots.map((s) => s.name) ?? [];
    const eventNames = table?.events.map((e) => e.name) ?? [];
    expect(slotNames.some((s) => s.includes('cell'))).toBe(true);
    expect(eventNames).not.toContain('row-click');
  });
});

describe('tokens data', () => {
  it('has all 4 categories', () => {
    const keys = Object.keys(TOKENS);
    expect(keys).toContain('colors');
    expect(keys).toContain('typography');
    expect(keys).toContain('radius');
    expect(keys).toContain('spacing');
  });

  it('every token has a name starting with -- and a non-empty value', () => {
    for (const tokens of Object.values(TOKENS)) {
      for (const t of tokens) {
        expect(t.name).toMatch(/^--/);
        expect(t.value).toBeTruthy();
      }
    }
  });

  it('colors category has tokens', () => {
    expect(TOKENS.colors.length).toBeGreaterThan(0);
  });
});

describe('icons data', () => {
  it('ALL_ICONS has entries', () => {
    expect(ALL_ICONS.length).toBeGreaterThan(100);
  });

  it('ICONS_BY_CATEGORY has multiple categories', () => {
    expect(Object.keys(ICONS_BY_CATEGORY).length).toBeGreaterThan(0);
  });

  it('common icons are present', () => {
    expect(ALL_ICONS).toContain('close-outline');
    expect(ALL_ICONS).toContain('chevron-down-outline');
    expect(ALL_ICONS).toContain('checkbox-checked');
  });

  it('all icon names are kebab-case strings', () => {
    for (const icon of ALL_ICONS) {
      expect(icon).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('ICONS_BY_CATEGORY values match ALL_ICONS', () => {
    const flatFromCategories = Object.values(ICONS_BY_CATEGORY).flat();
    expect(flatFromCategories.sort()).toEqual([...ALL_ICONS].sort());
  });
});
