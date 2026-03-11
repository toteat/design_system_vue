import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractEmits, extractSlots } from '../lib/extract-components.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../../');

describe('extractEmits', () => {
  it('extracts events from defineEmits<{}>()', () => {
    const vue = `
      <script setup lang="ts">
      const emit = defineEmits<{
        'update:modelValue': [value: string];
        change: [value: string];
      }>()
      </script>
    `;
    const events = extractEmits(vue);
    expect(events).toHaveLength(2);
    expect(events[0]).toEqual({ name: 'update:modelValue', payload: 'string' });
    expect(events[1]).toEqual({ name: 'change', payload: 'string' });
  });

  it('handles void payloads', () => {
    const vue = `
      <script setup lang="ts">
      const emit = defineEmits<{
        close: [];
      }>()
      </script>
    `;
    const events = extractEmits(vue);
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({ name: 'close', payload: 'void' });
  });

  it('returns empty array when no defineEmits found', () => {
    expect(extractEmits('<script setup></script>')).toEqual([]);
  });

  it('extracts events from the real Button.vue', () => {
    const buttonVue = readFileSync(
      resolve(ROOT, 'src/components/Button/Button.vue'),
      'utf-8',
    );
    const events = extractEmits(buttonVue);
    const eventNames = events.map((e) => e.name);
    expect(eventNames).toContain('click');
  });

  it('extracts events from the real TextInput.vue', () => {
    const inputVue = readFileSync(
      resolve(ROOT, 'src/components/TextInput/TextInput.vue'),
      'utf-8',
    );
    const events = extractEmits(inputVue);
    const eventNames = events.map((e) => e.name);
    expect(eventNames).toContain('update:modelValue');
    expect(eventNames).toContain('input');
    expect(eventNames).toContain('blur');
  });

  it('extracts events from the real Overlay.vue', () => {
    const overlayVue = readFileSync(
      resolve(ROOT, 'src/components/Overlay/Overlay.vue'),
      'utf-8',
    );
    const events = extractEmits(overlayVue);
    const eventNames = events.map((e) => e.name);
    expect(eventNames).toContain('update:visible');
    expect(eventNames).toContain('close');
  });
});

describe('extractSlots', () => {
  it('extracts default slot', () => {
    const vue = `<template><div><slot /></div></template>`;
    const slots = extractSlots(vue);
    expect(slots).toEqual([{ name: 'default' }]);
  });

  it('extracts named slots', () => {
    const vue = `<template><div><slot name="header" /><slot name="footer" /></div></template>`;
    const slots = extractSlots(vue);
    expect(slots).toHaveLength(2);
    expect(slots[0].name).toBe('header');
    expect(slots[1].name).toBe('footer');
  });

  it('deduplicates slots with the same name', () => {
    const vue = `<template><div><slot /><slot /></div></template>`;
    const slots = extractSlots(vue);
    expect(slots).toHaveLength(1);
  });

  it('returns empty array for templates without slots', () => {
    const vue = `<template><div>No slots here</div></template>`;
    expect(extractSlots(vue)).toEqual([]);
  });

  it('extracts dynamic slot names as {key} pattern', () => {
    const vue = `<template><div><slot :name="\`cell-\${column.key}\`" /></div></template>`;
    const slots = extractSlots(vue);
    expect(slots).toHaveLength(1);
    expect(slots[0].name).toBe('cell-{key}');
  });

  it('extracts slots from the real Card.vue', () => {
    const cardVue = readFileSync(
      resolve(ROOT, 'src/components/Card/Card.vue'),
      'utf-8',
    );
    const slots = extractSlots(cardVue);
    const slotNames = slots.map((s) => s.name);
    expect(slotNames).toContain('default');
  });

  it('extracts slots from the real Accordion.vue', () => {
    const accordionVue = readFileSync(
      resolve(ROOT, 'src/components/Accordion/Accordion.vue'),
      'utf-8',
    );
    const slots = extractSlots(accordionVue);
    const slotNames = slots.map((s) => s.name);
    expect(slotNames).toContain('default');
    expect(slotNames).toContain('label');
  });

  it('extracts dynamic cell slot from the real Table.vue', () => {
    const tableVue = readFileSync(
      resolve(ROOT, 'src/components/Table/Table.vue'),
      'utf-8',
    );
    const slots = extractSlots(tableVue);
    const slotNames = slots.map((s) => s.name);
    expect(slotNames.some((s) => s.includes('cell'))).toBe(true);
  });
});
