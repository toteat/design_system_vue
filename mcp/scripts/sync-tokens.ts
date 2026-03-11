/**
 * sync-tokens.ts
 *
 * Auto-generates mcp/src/data/tokens.ts from src/style.css.
 *
 * Usage: npx tsx scripts/sync-tokens.ts
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  extractTokens,
  categorizeTokens,
  generateTokensFile,
} from './lib/extract-tokens.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../');
const SOURCE_FILE = resolve(ROOT, 'src/style.css');
const OUT_FILE = resolve(__dirname, '../src/data/tokens.ts');

const source = readFileSync(SOURCE_FILE, 'utf-8');
const output = generateTokensFile(source);
writeFileSync(OUT_FILE, output, 'utf-8');

const allTokens = extractTokens(source);
const categories = categorizeTokens(allTokens);
const total = Object.values(categories).reduce(
  (sum, arr) => sum + arr.length,
  0,
);
const categoryNames = Object.keys(categories);
console.log(
  `\u2705 Written ${total} tokens (${categoryNames.map((c) => `${c}: ${categories[c].length}`).join(', ')}) to ${OUT_FILE}`,
);
