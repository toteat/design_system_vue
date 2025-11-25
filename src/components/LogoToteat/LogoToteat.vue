<script setup lang="ts">
import { computed } from 'vue';
import type { LogoToteatProps, LogoToteatVariant } from '@/types';

// Import SVG files
import LogoOriginal from './svg/toteat-logo-original.svg?raw';
import LogoCremaNaranja from './svg/toteat-logo-crema-naranja.svg?raw';
import LogoNegroCrema from './svg/toteat-logo-negro-crema.svg?raw';
import IsotipoOriginal from './svg/toteat-isotipo-original.svg?raw';
import IsotipoCremaNaranja from './svg/toteat-isotipo-crema-naranja.svg?raw';
import IsotipoNegroCrema from './svg/toteat-isotipo-crema-negro.svg?raw';

const props = withDefaults(defineProps<LogoToteatProps>(), {
  mode: 'complete',
  variant: 'original',
  width: undefined,
  height: undefined,
  alt: 'Logo Toteat',
});

// Computed SVG content based on mode and variant
const svgContent = computed(() => {
  if (props.mode === 'icon') {
    // Icon mode
    const iconMap: Record<LogoToteatVariant, string> = {
      original: IsotipoOriginal,
      'cream-orange': IsotipoCremaNaranja,
      'black-cream': IsotipoNegroCrema,
    };
    return iconMap[props.variant];
  }

  // Complete mode
  const logoMap: Record<LogoToteatVariant, string> = {
    original: LogoOriginal,
    'cream-orange': LogoCremaNaranja,
    'black-cream': LogoNegroCrema,
  };
  return logoMap[props.variant];
});

// Computed dimensions based on mode
const computedDimensions = computed(() => {
  if (props.width && props.height) {
    return { width: props.width, height: props.height };
  }

  // Default dimensions
  if (props.mode === 'icon') {
    return {
      width: props.width ?? 44,
      height: props.height ?? 44,
    };
  }

  // Complete mode - maintain aspect ratio from original SVG (317x80)
  if (props.width) {
    return {
      width: props.width,
      height: Math.round((props.width / 317) * 80),
    };
  }

  if (props.height) {
    return {
      width: Math.round((props.height / 80) * 317),
      height: props.height,
    };
  }

  return {
    width: 160,
    height: 40,
  };
});

// Modify SVG content to apply custom dimensions and accessibility attributes
const modifiedSvg = computed(() => {
  return svgContent.value
    .replace(/width="\d+"/, `width="${computedDimensions.value.width}"`)
    .replace(/height="\d+"/, `height="${computedDimensions.value.height}"`)
    .replace(/<svg/, `<svg role="img" aria-label="${props.alt}"`);
});
</script>

<template>
  <picture
    class="tot-ds-root logo-toteat"
    :data-mode="mode"
    :data-variant="variant"
    v-html="modifiedSvg"
  />
</template>

<style scoped>
@import '../../style.css';

.tot-ds-root {
  &.logo-toteat {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    line-height: 0;
    transition: opacity 200ms ease-in-out;

    &:hover {
      opacity: 0.9;
    }
  }

  /* Mode-specific styles */
  &[data-mode='icon'] {
    max-width: 100px;
    max-height: 100px;
  }

  &[data-mode='complete'] {
    max-width: 400px;
    max-height: 100px;
  }
}
</style>
