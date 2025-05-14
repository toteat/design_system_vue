<script lang="ts" setup>
import { computed } from 'vue';
import type { IconProps } from '@/types';
import * as Icons from './icons';

const props = withDefaults(defineProps<IconProps>(), {
  name: 'home-outline',
  size: 24,
  color: 'black',
});

const iconContent = computed(() => {
  /**
   * Return the svg icon content based on the provided name.
   * Icons ending in color will not be filled with the color prop.
   * Warns in the console if the requested icon is not found.
   *
   * @returns {string} The SVG content for the icon or an empty string if not found
   */

  const iconKey = `ICON_${props.name.replace(/-/g, '_').toUpperCase()}` as keyof typeof Icons;
  if (iconKey in Icons) {
    const potentialContent = Icons[iconKey];
    // Add type check for safety, though merge_assets.go should only produce strings
    if (Array.isArray(potentialContent) && potentialContent.length === 2) {
      return { path: potentialContent[0], viewBox: potentialContent[1] };
    }
  }
  console.warn(`[Icon.vue] Icon content not found for name: ${props.name} (resolved to key: ${iconKey})`);
  return { path: '', viewBox: '0 0 16 16' };
});

const applyFillColor = computed(() => {
  return props.name.endsWith('-outline') || props.name.endsWith('-filled');
});

</script>

<template>
  <svg
    :width="props.size"
    :height="props.size"
    :fill="applyFillColor ? `var(--color-${props.color})` : undefined"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="iconContent.viewBox"
    v-html="iconContent.path"
  >
  </svg>
</template>
