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
  const iconKey = `ICON_${props.name.replace(/-/g, '_').toUpperCase()}` as keyof typeof Icons;
  if (iconKey in Icons) {
    const potentialContent = Icons[iconKey];
    // Add type check for safety, though merge_assets.go should only produce strings
    if (typeof potentialContent === 'string') {
      return potentialContent;
    }
  }
  console.warn(`[Icon.vue] Icon content not found for name: ${props.name} (resolved to key: ${iconKey})`);
  return '';
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
    :viewBox="`0 0 ${props.size} ${props.size}`"
    v-html="iconContent"
  >
  </svg>
</template>
