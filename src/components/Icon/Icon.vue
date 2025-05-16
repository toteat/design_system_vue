<script lang="ts" setup>
import { computed, type ComputedRef } from 'vue';
import type { IconContent, IconProps } from '@/types';
import * as Icons from './icons';

const props = withDefaults(defineProps<IconProps>(), {
  name: 'home-outline',
  size: 1,
  color: 'black',
});

const iconContent: ComputedRef<IconContent> = computed(() => {
  /**
   * Return the svg icon content based on the provided name.
   * Only Icon names ending in '-outline' or '-filled' will be filled with the color prop.
   **/

  const iconKey =
    `ICON_${props.name.replace(/-/g, '_').toUpperCase()}` as keyof typeof Icons;
  if (iconKey in Icons) {
    const potentialContent = Icons[iconKey];
    // Add type check for safety, though merge_assets.go should only produce strings
    if (Array.isArray(potentialContent) && potentialContent.length === 2) {
      return { path: potentialContent[0], viewBox: potentialContent[1] };
    }
  }
  console.warn(
    `[Icon.vue] Icon content not found for name: ${props.name} (resolved to key: ${iconKey})`,
  );
  return { path: '', viewBox: '0 0 16 16' };
});

const applyFillColor = computed(() => {
  return props.name.endsWith('-outline') || props.name.endsWith('-filled');
});
</script>

<template>
  <svg
    class="tot-ds-root icon"
    :style="{ '--size': `${props.size}rem` }"
    :fill="applyFillColor ? `var(--color-${props.color})` : undefined"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="iconContent.viewBox"
    v-html="iconContent.path"
  ></svg>
</template>

<style scoped>
.tot-ds-root {
  &.icon {
    width: var(--size, 1rem);
    height: var(--size, 1rem);
    display: inline-block;
  }
}
</style>
