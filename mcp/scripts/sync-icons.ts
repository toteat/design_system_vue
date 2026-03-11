/**
 * sync-icons.ts
 *
 * Auto-generates mcp/src/data/icons.ts from src/components/Icon/icons.ts.
 *
 * Usage: npx tsx scripts/sync-icons.ts
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractIconNames, generateIconsFile } from './lib/extract-icons.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../');
const SOURCE_FILE = resolve(ROOT, 'src/components/Icon/icons.ts');
const OUT_FILE = resolve(__dirname, '../src/data/icons.ts');

const source = readFileSync(SOURCE_FILE, 'utf-8');
const iconNames = extractIconNames(source);
console.log(`Found ${iconNames.length} icons in source`);

const output = generateIconsFile(iconNames);
writeFileSync(OUT_FILE, output, 'utf-8');
console.log(`\u2705 Written ${iconNames.length} icons to ${OUT_FILE}`);
