/**
 * Pure functions for extracting and categorizing icons from source.
 * Imported by sync-icons.ts (script) and tests.
 */

// Category rules: prefix → category
const CATEGORY_RULES: [RegExp, string][] = [
  [/^arrow-|^chevron-/, 'arrows'],
  [/^home-|^menu-|^search-|^location-|^expand-|^layout-/, 'navigation'],
  [
    /^checkbox-|^check-|^close-|^drag-|^eye-|^minus-|^pencil|^plus-|^radio-button-|^refresh-|^delete-|^tap-/,
    'ui-controls',
  ],
  [
    /^barcode-|^copy-|^document-|^export-|^import-|^printer-|^sheet-|^purchase-|^split-|^ticket/,
    'documents',
  ],
  [/^cloud-/, 'documents'],
  [/^discount-|^money-|^nfc-|^shopping-|^tag-/, 'commerce'],
  [
    /^bell-|^facebook-|^google-|^hashtag-|^instagram-|^linkedin-|^mail-|^phone-|^twitter-|^whatsapp-/,
    'communication',
  ],
  [
    /^error-|^exclamation-|^info-|^success-|^warning-|^rocket-|^star-/,
    'status',
  ],
  [
    /^apple-|^carrot-|^chicken-|^chili-|^fire-|^fish-|^lactose-|^leaf-|^sugar-|^wheat-/,
    'food-health',
  ],
  [/^calendar-|^wifi-/, 'media'],
  [/^key-|^lock-|^user-/, 'other'],
];

export const CATEGORY_ORDER = [
  'arrows',
  'navigation',
  'ui-controls',
  'documents',
  'commerce',
  'communication',
  'status',
  'food-health',
  'media',
  'other',
];

export function categorize(iconName: string): string {
  for (const [pattern, category] of CATEGORY_RULES) {
    if (pattern.test(iconName)) return category;
  }
  return 'other';
}

export function extractIconNames(source: string): string[] {
  const names: string[] = [];
  const exportRe = /export const ICON_([A-Z0-9_]+)\s*=/g;
  let match: RegExpExecArray | null;
  while ((match = exportRe.exec(source)) !== null) {
    names.push(match[1].toLowerCase().replace(/_/g, '-'));
  }
  return names;
}

export function groupByCategory(iconNames: string[]): Map<string, string[]> {
  const byCategory = new Map<string, string[]>();
  for (const name of iconNames) {
    const cat = categorize(name);
    const existing = byCategory.get(cat);
    if (existing) {
      existing.push(name);
    } else {
      byCategory.set(cat, [name]);
    }
  }
  // Sort icons within each category
  for (const [, icons] of byCategory) {
    icons.sort();
  }
  return byCategory;
}

export function generateIconsFile(iconNames: string[]): string {
  const byCategory = groupByCategory(iconNames);

  const lines: string[] = [
    `// AUTO-GENERATED — run \`npm run sync:icons\` to update from source.`,
    ``,
    `export type IconCategory =`,
  ];

  for (let i = 0; i < CATEGORY_ORDER.length; i++) {
    const sep = i < CATEGORY_ORDER.length - 1 ? '' : ';';
    lines.push(`  | '${CATEGORY_ORDER[i]}'${sep}`);
  }

  lines.push(``);
  lines.push(
    `export const ICONS_BY_CATEGORY: Record<IconCategory, string[]> = {`,
  );

  for (const cat of CATEGORY_ORDER) {
    const icons = byCategory.get(cat) ?? [];
    const key = cat.includes('-') ? `'${cat}'` : cat;
    lines.push(`  ${key}: [`);
    for (const icon of icons) {
      lines.push(`    '${icon}',`);
    }
    lines.push(`  ],`);
  }

  lines.push(`};`);
  lines.push(``);
  lines.push(
    `export const ALL_ICONS: string[] = Object.values(ICONS_BY_CATEGORY).flat();`,
  );
  lines.push(``);

  return lines.join('\n');
}
