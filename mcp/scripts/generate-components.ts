/**
 * generate-components.ts
 *
 * Auto-generates mcp/src/data/components.ts from the real source code.
 *
 * Sources:
 *   src/types/index.d.ts  → props (TypeScript compiler API)
 *   src/components/*.vue  → emits + slots (regex)
 *
 * Descriptions come from scripts/descriptions.json (edited manually).
 * Everything else is auto-generated and stays in sync with the source.
 *
 * Usage:
 *   npm run generate
 */

import ts from 'typescript';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractEmits, extractSlots } from './lib/extract-components.js';
import type { PropDef, EventDef, SlotDef } from './lib/extract-components.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../');
const TYPES_FILE = join(ROOT, 'src/types/index.d.ts');
const COMPONENTS_DIR = join(ROOT, 'src/components');
const OUT_FILE = resolve(__dirname, '../src/data/components.ts');
const DESCRIPTIONS_FILE = resolve(__dirname, 'descriptions.json');

// ─── Types ────────────────────────────────────────────────────────────────────

type SourceData = { props: PropDef[]; events: EventDef[]; slots: SlotDef[] };

type ManualEventDef = { name: string; payload: string; description?: string };

type Descriptions = Record<
  string,
  {
    description?: string;
    props?: Record<string, string>;
    events?: Record<string, string>;
    manualEvents?: ManualEventDef[];
    slots?: Record<string, string>;
    propDefaults?: Record<string, string>;
  }
>;

// ─── Extract props from index.d.ts via TypeScript compiler API ───────────────

export function extractAllProps(typesFile: string): Map<string, PropDef[]> {
  const program = ts.createProgram([typesFile], { strict: true });
  const sourceFile = program.getSourceFile(typesFile);
  if (!sourceFile) throw new Error(`Cannot open ${typesFile}`);
  const checker = program.getTypeChecker();
  const result = new Map<string, PropDef[]>();

  ts.forEachChild(sourceFile, (node) => {
    if (
      !ts.isTypeAliasDeclaration(node) ||
      !node.name.text.endsWith('Props') ||
      !ts.isTypeLiteralNode(node.type)
    )
      return;

    const componentName = node.name.text.replace(/Props$/, '');
    const props: PropDef[] = [];

    for (const member of node.type.members) {
      if (!ts.isPropertySignature(member) || !member.name) continue;
      const propName = member.name.getText(sourceFile);
      const required = !member.questionToken;
      const typeNode = member.type;

      let typeStr = typeNode
        ? checker.typeToString(checker.getTypeFromTypeNode(typeNode))
        : 'unknown';

      typeStr = typeStr
        .replace(/import\("[^"]+"\)\./g, '')
        .replace(
          /ButtonHTMLAttributes\["type"\]/g,
          '"button" | "submit" | "reset"',
        );

      props.push({ name: propName, type: typeStr, required });
    }

    result.set(componentName, props);
  });

  return result;
}

// ─── Code generation ──────────────────────────────────────────────────────────

function esc(s: string): string {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
}

export function generate(
  data: Map<string, SourceData>,
  descs: Descriptions,
  orderedNames: string[],
): string {
  const lines = [
    `// AUTO-GENERATED — run \`npm run generate\` to update.`,
    `// Descriptions live in scripts/descriptions.json (edit there, not here).`,
    ``,
    `export type PropDef = {`,
    `  name: string; type: string; required?: boolean; default?: string; description?: string;`,
    `};`,
    `export type EventDef = { name: string; payload: string; description?: string; };`,
    `export type SlotDef  = { name: string; description?: string; };`,
    `export type ComponentDef = {`,
    `  name: string; description: string;`,
    `  props: PropDef[]; events: EventDef[]; slots: SlotDef[];`,
    `};`,
    ``,
    `export const COMPONENTS: ComponentDef[] = [`,
  ];

  for (const name of orderedNames) {
    const d = data.get(name);
    if (!d) {
      console.warn(`  \u26a0  No data for ${name}`);
      continue;
    }

    const cd = descs[name] ?? {};
    const desc = cd.description ?? `${name} component`;

    lines.push(`  {`);
    lines.push(`    name: '${name}',`);
    lines.push(`    description: '${esc(desc)}',`);

    lines.push(`    props: [`);
    for (const p of d.props) {
      const parts: string[] = [`name: '${p.name}'`, `type: '${esc(p.type)}'`];
      if (p.required) parts.push(`required: true`);
      const def = cd.propDefaults?.[p.name];
      if (def) parts.push(`default: '${esc(def)}'`);
      const pdesc = cd.props?.[p.name];
      if (pdesc) parts.push(`description: '${esc(pdesc)}'`);
      lines.push(`      { ${parts.join(', ')} },`);
    }
    lines.push(`    ],`);

    if (
      d.events.length === 0 &&
      cd.events &&
      Object.keys(cd.events).length > 0 &&
      !cd.manualEvents
    ) {
      console.warn(
        `  \u26a0  ${name}: descriptions.json has event descriptions but 0 events were auto-detected. Use manualEvents instead.`,
      );
    }

    const allEvents = [...d.events, ...(cd.manualEvents ?? [])];
    lines.push(`    events: [`);
    for (const e of allEvents) {
      const parts = [`name: '${e.name}'`, `payload: '${esc(e.payload)}'`];
      const edesc =
        cd.events?.[e.name] ?? ('description' in e ? e.description : undefined);
      if (edesc) parts.push(`description: '${esc(edesc)}'`);
      lines.push(`      { ${parts.join(', ')} },`);
    }
    lines.push(`    ],`);

    lines.push(`    slots: [`);
    for (const s of d.slots) {
      const parts = [`name: '${s.name}'`];
      const sdesc = cd.slots?.[s.name];
      if (sdesc) parts.push(`description: '${esc(sdesc)}'`);
      lines.push(`      { ${parts.join(', ')} },`);
    }
    lines.push(`    ],`);

    lines.push(`  },`);
  }

  lines.push(
    `];`,
    ``,
    `export const COMPONENT_MAP = new Map<string, ComponentDef>(`,
    `  COMPONENTS.map((c) => [c.name.toLowerCase(), c]),`,
    `);`,
    ``,
  );

  return lines.join('\n');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export const COMPONENT_NAMES = [
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

function main(): void {
  console.log('\ud83d\udcd6 Parsing types/index.d.ts...');
  const allProps = extractAllProps(TYPES_FILE);
  console.log(`   \u2192 ${allProps.size} *Props types found\n`);

  const descriptions: Descriptions = existsSync(DESCRIPTIONS_FILE)
    ? JSON.parse(readFileSync(DESCRIPTIONS_FILE, 'utf-8'))
    : {};

  const componentData = new Map<string, SourceData>();

  for (const name of COMPONENT_NAMES) {
    const vueFile = join(COMPONENTS_DIR, name, `${name}.vue`);
    const props = allProps.get(name) ?? [];
    const vueContent = existsSync(vueFile)
      ? readFileSync(vueFile, 'utf-8')
      : null;
    const events = vueContent ? extractEmits(vueContent) : [];
    const slots = vueContent ? extractSlots(vueContent) : [];

    console.log(
      `  \u2713 ${name.padEnd(18)} ${props.length} props  ${events.length} events  ${slots.length} slots`,
    );
    componentData.set(name, { props, events, slots });
  }

  const output = generate(componentData, descriptions, COMPONENT_NAMES);
  writeFileSync(OUT_FILE, output, 'utf-8');
  console.log(`\n\u2705 Written to ${OUT_FILE}`);
}

// Only run when executed directly, not when imported
const currentFile = fileURLToPath(import.meta.url);
const isDirectRun = process.argv[1]
  ? resolve(process.argv[1]) === resolve(currentFile)
  : false;

if (isDirectRun) {
  main();
}
