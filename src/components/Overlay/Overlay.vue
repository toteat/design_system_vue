<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue';
import type { OverlayProps } from '@/types';

const props = withDefaults(defineProps<OverlayProps>(), {
  visible: false,
  dismissible: true,
  closeOnBackdrop: true,
  closeOnEsc: true,
  lockScroll: true,
  blur: false,
  placement: 'center',
  zIndex: 1200,
  role: 'presentation',
});

const emit = defineEmits<{
  'update:visible': [value: boolean];
  close: [];
  escape: [];
  'backdrop-click': [];
}>();

const bodyOverflowBackup = ref<string | null>(null);

const getDocument = () => {
  if (typeof globalThis === 'undefined') {
    return undefined;
  }
  return globalThis.document;
};

const getWindow = () => {
  if (typeof globalThis === 'undefined') {
    return undefined;
  }
  return globalThis.window;
};

const lockBodyScroll = () => {
  if (!props.lockScroll) return;
  const doc = getDocument();
  if (!doc) return;
  if (bodyOverflowBackup.value === null) {
    bodyOverflowBackup.value = doc.body.style.overflow || '';
  }
  doc.body.style.overflow = 'hidden';
};

const unlockBodyScroll = () => {
  if (!props.lockScroll) return;
  const doc = getDocument();
  if (!doc) return;
  if (bodyOverflowBackup.value === null) return;
  doc.body.style.overflow = bodyOverflowBackup.value;
  bodyOverflowBackup.value = null;
};

const handleKeydown = (event: globalThis.KeyboardEvent) => {
  if (!props.visible || !props.closeOnEsc || event.key !== 'Escape') {
    return;
  }

  emit('escape');

  if (!props.dismissible) {
    return;
  }

  emit('close');
  emit('update:visible', false);
};

watch(
  () => props.visible,
  (visible) => {
    if (visible) {
      lockBodyScroll();
      const win = getWindow();
      if (props.closeOnEsc && win) {
        win.addEventListener('keydown', handleKeydown);
      }
    } else {
      const win = getWindow();
      if (props.closeOnEsc && win) {
        win.removeEventListener('keydown', handleKeydown);
      }
      unlockBodyScroll();
    }
  },
  { immediate: true },
);

onUnmounted(() => {
  const win = getWindow();
  if (props.closeOnEsc && win) {
    win.removeEventListener('keydown', handleKeydown);
  }
  unlockBodyScroll();
});

const requestClose = () => {
  emit('close');
  emit('update:visible', false);
};

const handleBackdropClick = () => {
  emit('backdrop-click');

  if (!props.dismissible || !props.closeOnBackdrop) {
    return;
  }

  requestClose();
};
</script>

<template>
  <Teleport to="body">
    <Transition name="overlay-fade">
      <div
        v-if="props.visible"
        class="tot-ds-root overlay"
        :data-blur="props.blur"
        :data-placement="props.placement"
        :style="{ '--overlay-z-index': props.zIndex?.toString() }"
        :role="props.role"
        :aria-hidden="props.visible ? 'false' : 'true'"
        :aria-label="props.ariaLabel || undefined"
        @click.self="handleBackdropClick"
      >
        <div class="overlay__content">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
@import '../../style.css';

.tot-ds-root {
  &.overlay {
    position: fixed;
    inset: 0;
    display: flex;
    width: 100vw;
    height: 100vh;
    padding: clamp(1.5rem, 4vw, 3rem);
    background-color: color-mix(
      in srgb,
      var(--color-secondary) 60%,
      transparent
    );
    color: var(--color-white);
    z-index: var(--overlay-z-index, 1200);
    transition: background-color 200ms ease;

    &[data-blur='true'] {
      backdrop-filter: blur(0.75rem);
    }

    &[data-placement='top'] {
      align-items: flex-start;
    }

    &[data-placement='center'] {
      align-items: center;
    }

    &[data-placement='bottom'] {
      align-items: flex-end;
    }

    justify-content: center;
  }

  & .overlay__content {
    width: min(100%, 64rem);
    display: flex;
    justify-content: center;
    pointer-events: none;

    & > * {
      pointer-events: auto;
      width: 100%;
    }
  }
}

.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 200ms ease-in-out;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .overlay-fade-enter-active,
  .overlay-fade-leave-active {
    transition: none;
  }
}
</style>
