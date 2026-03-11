/**
 * Pure functions for extracting component data from Vue source files.
 * Imported by generate-components.ts (script) and tests.
 */

export type PropDef = { name: string; type: string; required: boolean };
export type EventDef = { name: string; payload: string };
export type SlotDef = { name: string };

export function extractEmits(vueContent: string): EventDef[] {
  const match = vueContent.match(/defineEmits<\{([\s\S]*?)\}>\(\)/);
  if (!match) return [];

  const block = match[1];
  const events: EventDef[] = [];

  const lineRe = /^\s*['"]?([\w:-]+)['"]?\s*:\s*\[([\s\S]*?)\];/gm;
  let m: RegExpExecArray | null;

  while ((m = lineRe.exec(block)) !== null) {
    const name = m[1];
    const rawPayload = m[2]
      .replace(/\s+/g, ' ')
      .replace(/globalThis\./g, '')
      .trim();

    const payload = rawPayload
      ? rawPayload
          .split(/,(?![^<>{[\]]*[>\]|}])/)
          .map((p) => {
            const colon = p.indexOf(':');
            return colon !== -1 ? p.slice(colon + 1).trim() : p.trim();
          })
          .filter(Boolean)
          .join(', ') || 'void'
      : 'void';

    events.push({ name, payload });
  }

  return events;
}

export function extractSlots(vueContent: string): SlotDef[] {
  const slots: SlotDef[] = [];
  const seen = new Set<string>();
  const slotRe = /<slot(?:\s[^>]*)?\/?>/g;
  let m: RegExpExecArray | null;

  while ((m = slotRe.exec(vueContent)) !== null) {
    const tag = m[0];
    const namedMatch = tag.match(
      /(?::name="`([^$`]+)\$\{[^`]+\}`"|name="([^"]+)")/,
    );
    const slotName = namedMatch
      ? namedMatch[1]
        ? `${namedMatch[1]}{key}`
        : namedMatch[2]
      : 'default';

    if (!seen.has(slotName)) {
      seen.add(slotName);
      slots.push({ name: slotName });
    }
  }

  return slots;
}
