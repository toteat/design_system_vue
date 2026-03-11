/**
 * Pure functions for extracting and categorizing tokens from CSS source.
 * Imported by sync-tokens.ts (script) and tests.
 */

export type Token = { name: string; value: string; description?: string };

// Known descriptions for tokens
const DESCRIPTIONS: Record<string, string> = {
  '--color-primary': 'Brand primary red',
  '--color-secondary': 'Brand secondary dark',
  '--color-blue': 'Info blue',
  '--color-green': 'Success green',
  '--color-yellow': 'Warning yellow',
  '--color-red': 'Error red',
  '--text-sm': 'Minimum for interactive elements',
  '--text-base': 'Default body text',
  '--radius-sm': '4px - Small radius',
  '--radius-base': '8px - Standard radius',
  '--radius-lg': '12px - Large radius',
  '--radius-xl': '16px - Extra large',
  '--radius-pill': 'Pill shape',
  '--radius-circle': 'Perfect circle',
  '--spacing-xs': '4px',
  '--spacing-sm': '8px',
  '--spacing-md': '12px',
  '--spacing-lg': '16px',
  '--spacing-xl': '24px',
  '--spacing-2xl': '32px',
  '--spacing-3xl': '48px',
};

export const TOKEN_CATEGORIES = [
  'colors',
  'typography',
  'radius',
  'spacing',
] as const;

export function extractTokens(cssSource: string): Token[] {
  const propRe = /(--[\w-]+)\s*:\s*([^;]+);/g;
  const tokens: Token[] = [];
  let match: RegExpExecArray | null;

  while ((match = propRe.exec(cssSource)) !== null) {
    const name = match[1];
    const value = match[2].trim();
    const token: Token = { name, value };
    if (DESCRIPTIONS[name]) token.description = DESCRIPTIONS[name];
    tokens.push(token);
  }

  return tokens;
}

export function categorizeTokens(tokens: Token[]): Record<string, Token[]> {
  const categories: Record<string, Token[]> = {
    colors: [],
    typography: [],
    radius: [],
    spacing: [],
  };

  for (const token of tokens) {
    if (token.name.startsWith('--color-')) categories.colors.push(token);
    else if (token.name.startsWith('--text-'))
      categories.typography.push(token);
    else if (token.name.startsWith('--radius-')) categories.radius.push(token);
    else if (token.name.startsWith('--spacing-'))
      categories.spacing.push(token);
  }

  return categories;
}

export function generateTokensFile(cssSource: string): string {
  const allTokens = extractTokens(cssSource);
  const categories = categorizeTokens(allTokens);
  const categoryNames = Object.keys(categories);

  const lines: string[] = [
    `// AUTO-GENERATED — run \`npm run sync:tokens\` to update from source.`,
    ``,
    `export type TokenCategory = ${categoryNames.map((c) => `'${c}'`).join(' | ')};`,
    ``,
    `export type Token = {`,
    `  name: string;`,
    `  value: string;`,
    `  description?: string;`,
    `};`,
    ``,
    `export const TOKENS: Record<TokenCategory, Token[]> = {`,
  ];

  for (const [cat, tokens] of Object.entries(categories)) {
    lines.push(`  ${cat}: [`);
    for (const t of tokens) {
      const parts = [`name: '${t.name}'`, `value: '${t.value}'`];
      if (t.description) parts.push(`description: '${t.description}'`);
      const singleLine = `    { ${parts.join(', ')} },`;
      if (singleLine.length <= 80) {
        lines.push(singleLine);
      } else {
        lines.push(`    {`);
        for (const part of parts) {
          lines.push(`      ${part},`);
        }
        lines.push(`    },`);
      }
    }
    lines.push(`  ],`);
  }

  lines.push(`};`);
  lines.push(``);

  return lines.join('\n');
}
