<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useId, useSlots, watch } from 'vue';
import type { Ref } from 'vue';
import type {
  OverlayMessageProps,
  OverlayMessageStatus,
  ThemeColor,
} from '@/types';
import type { IconNames } from '../Icon/icons';
import Overlay from '../Overlay/Overlay.vue';
import Icon from '../Icon/Icon.vue';
import Button from '../Button/Button.vue';

type OverlayMessageRegistry = {
  activeId: Ref<string | null>;
};

type OverlayRegistryTarget = typeof globalThis & {
  __totDsOverlayMessageRegistry__?: OverlayMessageRegistry;
};

const props = withDefaults(defineProps<OverlayMessageProps>(), {
  visible: false,
  status: 'success',
  dismissible: true,
  closeButtonLabel: 'Close overlay message',
  closeOnBackdrop: true,
  closeOnEsc: true,
  lockScroll: true,
  primaryButtonVariant: 'primary',
  secondaryButtonVariant: 'outline',
  loadingPrimary: false,
  loadingSecondary: false,
  showCloseButton: true,
  maxWidth: 400,
  standalone: false,
  iconSize: 2.75,
});

const emit = defineEmits<{
  'update:visible': [value: boolean];
  close: [];
  'primary-click': [];
  'secondary-click': [];
  'backdrop-click': [];
  escape: [];
}>();

const overlayRegistryTarget = globalThis as OverlayRegistryTarget;

if (!overlayRegistryTarget.__totDsOverlayMessageRegistry__) {
  overlayRegistryTarget.__totDsOverlayMessageRegistry__ = {
    activeId: ref<string | null>(null),
  };
}

const overlayMessageRegistry =
  overlayRegistryTarget.__totDsOverlayMessageRegistry__;

const slots = useSlots();
const isInstanceVisible = ref(false);
const shouldUseOverlay = computed(() => !props.standalone);

const fallbackId = `overlay-message-${Math.random().toString(36).slice(2, 8)}`;
const uniqueId = typeof useId === 'function' ? useId() : fallbackId;
const titleId = `${uniqueId}-title`;
const bodyId = `${uniqueId}-body`;

const statusIconMap: Record<OverlayMessageStatus, IconNames> = {
  success: 'success-filled-green',
  info: 'info-filled-blue',
  warning: 'warning-filled-yellow',
  error: 'error-filled-red',
};

const statusColorMap: Record<OverlayMessageStatus, ThemeColor> = {
  success: 'green',
  info: 'blue',
  warning: 'yellow',
  error: 'red',
};

const statusTone = computed<OverlayMessageStatus>(
  () => props.status || 'success',
);
const resolvedIcon = computed<IconNames>(
  () => props.iconName ?? statusIconMap[statusTone.value],
);
const resolvedIconColor = computed<ThemeColor>(
  () => props.iconColor ?? statusColorMap[statusTone.value],
);
const resolvedIconSize = computed(() => props.iconSize ?? 2.75);

const hasDefaultSlot = computed(() => Boolean(slots.default));
const hasBodyContent = computed(() => hasDefaultSlot.value);
const hasActionsSlot = computed(() => Boolean(slots.actions));
const showActions = computed(() => {
  return (
    hasActionsSlot.value ||
    Boolean(props.primaryButtonLabel) ||
    Boolean(props.secondaryButtonLabel)
  );
});

const describedBy = computed(() => (hasBodyContent.value ? bodyId : undefined));

const resolvedVisible = computed(() => {
  if (!shouldUseOverlay.value) {
    return false;
  }
  return props.visible && overlayMessageRegistry.activeId.value === uniqueId;
});

const resolvedRole = computed(() =>
  shouldUseOverlay.value ? 'alertdialog' : 'region',
);

watch(
  () => props.visible,
  (visible) => {
    isInstanceVisible.value = visible;
    if (!shouldUseOverlay.value) {
      return;
    }
    if (visible) {
      overlayMessageRegistry.activeId.value = uniqueId;
    } else if (overlayMessageRegistry.activeId.value === uniqueId) {
      overlayMessageRegistry.activeId.value = null;
    }
  },
  { immediate: true },
);

watch(
  () => overlayMessageRegistry.activeId.value,
  (activeId) => {
    if (!shouldUseOverlay.value) {
      return;
    }
    if (activeId === uniqueId || !isInstanceVisible.value) {
      return;
    }
    emit('close');
    emit('update:visible', false);
  },
);

watch(shouldUseOverlay, (useOverlay) => {
  if (!useOverlay) {
    if (overlayMessageRegistry.activeId.value === uniqueId) {
      overlayMessageRegistry.activeId.value = null;
    }
    return;
  }

  if (props.visible) {
    overlayMessageRegistry.activeId.value = uniqueId;
  }
});

onBeforeUnmount(() => {
  if (overlayMessageRegistry.activeId.value === uniqueId) {
    overlayMessageRegistry.activeId.value = null;
  }
});

const handleClose = () => {
  emit('close');
  emit('update:visible', false);
};

const handlePrimary = () => {
  emit('primary-click');
};

const handleSecondary = () => {
  emit('secondary-click');
};
</script>

<template>
  <Overlay
    v-if="shouldUseOverlay"
    :visible="resolvedVisible"
    :dismissible="props.dismissible"
    :close-on-backdrop="props.closeOnBackdrop"
    :close-on-esc="props.closeOnEsc"
    :lock-scroll="props.lockScroll"
    :z-index="props.zIndex"
    :blur="props.blur"
    :placement="props.placement"
    :aria-label="props.ariaLabel"
    @close="handleClose"
    @backdrop-click="emit('backdrop-click')"
    @escape="emit('escape')"
    @update:visible="emit('update:visible', $event)"
  >
    <section
      class="tot-ds-root overlay-message"
      :data-status="statusTone"
      :data-standalone="props.standalone"
      :role="resolvedRole"
      aria-modal="true"
      :aria-label="props.ariaLabel"
      :aria-labelledby="titleId"
      :aria-describedby="describedBy"
      :style="{ '--overlay-message-max-width': `${props.maxWidth}px` }"
    >
      <header class="overlay-message__header">
        <div class="overlay-message__icon" aria-hidden="true">
          <slot name="icon">
            <Icon
              :name="resolvedIcon"
              :size="resolvedIconSize"
              :color="resolvedIconColor"
            />
          </slot>
        </div>
        <div class="overlay-message__headline">
          <p v-if="props.eyebrow" class="overlay-message__eyebrow">
            {{ props.eyebrow }}
          </p>
          <h2 class="overlay-message__title" :id="titleId">
            {{ props.title }}
          </h2>
        </div>
        <button
          v-if="props.dismissible && props.showCloseButton"
          class="overlay-message__close"
          type="button"
          :aria-label="props.closeButtonLabel"
          @click="handleClose"
        >
          <Icon name="close-outline" :size="1.25" color="neutral-400" />
        </button>
      </header>

      <div v-if="hasBodyContent" class="overlay-message__body" :id="bodyId">
        <slot />
      </div>

      <footer v-if="showActions" class="overlay-message__actions">
        <slot
          name="actions"
          :close="handleClose"
          :primary="handlePrimary"
          :secondary="handleSecondary"
        >
          <Button
            v-if="props.secondaryButtonLabel"
            :text="props.secondaryButtonLabel"
            :variant="props.secondaryButtonVariant"
            size="medium"
            is-full
            :loading="props.loadingSecondary"
            @click="handleSecondary"
          />
          <Button
            v-if="props.primaryButtonLabel"
            :text="props.primaryButtonLabel"
            :variant="props.primaryButtonVariant"
            size="medium"
            is-full
            :loading="props.loadingPrimary"
            @click="handlePrimary"
          />
        </slot>
      </footer>
    </section>
  </Overlay>
  <section
    v-else-if="props.visible"
    class="tot-ds-root overlay-message"
    :data-status="statusTone"
    :data-standalone="props.standalone"
    :role="resolvedRole"
    :aria-modal="shouldUseOverlay ? 'true' : undefined"
    :aria-label="props.ariaLabel"
    :aria-labelledby="titleId"
    :aria-describedby="describedBy"
    :style="{ '--overlay-message-max-width': `${props.maxWidth}px` }"
  >
    <header class="overlay-message__header">
      <div class="overlay-message__icon" aria-hidden="true">
        <slot name="icon">
          <Icon
            :name="resolvedIcon"
            :size="resolvedIconSize"
            :color="resolvedIconColor"
          />
        </slot>
      </div>
      <div class="overlay-message__headline">
        <p v-if="props.eyebrow" class="overlay-message__eyebrow">
          {{ props.eyebrow }}
        </p>
        <h2 class="overlay-message__title" :id="titleId">
          {{ props.title }}
        </h2>
      </div>
      <button
        v-if="props.dismissible && props.showCloseButton"
        class="overlay-message__close"
        type="button"
        :aria-label="props.closeButtonLabel"
        @click="handleClose"
      >
        <Icon name="close-outline" :size="1.25" color="neutral-400" />
      </button>
    </header>

    <div v-if="hasBodyContent" class="overlay-message__body" :id="bodyId">
      <slot />
    </div>

    <footer v-if="showActions" class="overlay-message__actions">
      <slot
        name="actions"
        :close="handleClose"
        :primary="handlePrimary"
        :secondary="handleSecondary"
      >
        <Button
          v-if="props.secondaryButtonLabel"
          :text="props.secondaryButtonLabel"
          :variant="props.secondaryButtonVariant"
          size="medium"
          is-full
          :loading="props.loadingSecondary"
          @click="handleSecondary"
        />
        <Button
          v-if="props.primaryButtonLabel"
          :text="props.primaryButtonLabel"
          :variant="props.primaryButtonVariant"
          size="medium"
          is-full
          :loading="props.loadingPrimary"
          @click="handlePrimary"
        />
      </slot>
    </footer>
  </section>
</template>

<style scoped>
@import '../../style.css';

.tot-ds-root {
  &.overlay-message {
    --overlay-message-accent: var(--color-primary);
    width: min(100%, var(--overlay-message-max-width, 26rem));
    background-color: var(--color-white);
    border-radius: var(--radius-xl);
    padding: clamp(1.5rem, 4vw, 2.75rem);
    box-shadow: 0 35px 100px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    gap: calc(var(--text-lg--line-height) / 16px * 1rem);

    &[data-standalone='true'] {
      box-shadow: none;
      border: 1px solid var(--color-neutral-200);
      min-height: 16.625rem;
    }

    &[data-status='success'] {
      --overlay-message-accent: var(--color-green);
    }

    &[data-status='info'] {
      --overlay-message-accent: var(--color-blue);
    }

    &[data-status='warning'] {
      --overlay-message-accent: var(--color-yellow);
    }

    &[data-status='error'] {
      --overlay-message-accent: var(--color-red);
    }
  }

  & .overlay-message__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.75rem;
    position: relative;
    padding-inline: 0.5rem;
  }

  & .overlay-message__icon {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: var(--radius-circle);
    background: color-mix(
      in srgb,
      var(--overlay-message-accent) 15%,
      transparent
    );
    display: grid;
    place-items: center;
  }

  & .overlay-message__headline {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: center;
  }

  & .overlay-message__eyebrow {
    font-size: var(--text-xs);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-neutral-400);
    font-weight: 600;
  }

  & .overlay-message__title {
    font-size: clamp(var(--text-lg), 2vw, var(--text-xl));
    line-height: 1.2;
    font-weight: 600;
    margin-top: 2rem;
    color: var(--color-secondary);
  }

  & .overlay-message__close {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--radius-circle);
    border: 1px solid transparent;
    background: transparent;
    color: var(--color-neutral-400);
    display: grid;
    place-items: center;
    transition:
      border-color 150ms ease,
      color 150ms ease;
    position: absolute;
    top: 0;
    right: 0;

    &:hover {
      color: var(--color-secondary);
    }

    &:focus-visible {
      outline: 2px solid var(--overlay-message-accent);
      outline-offset: 2px;
    }
  }

  & .overlay-message__body {
    font-size: var(--text-base);
    color: var(--color-neutral-500);
    line-height: 1.5;
  }

  & .overlay-message__actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
  }
}
</style>
