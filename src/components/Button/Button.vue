<script lang="ts" setup>
import { type ButtonHTMLAttributes } from 'vue';
import type { ButtonSize, ButtonType } from '@/models/button';
import type { IconNames } from '@/models/icon';
import useTranslationsQuery from '@/features/translations/queries/translationsQuery';

interface Props {
  type?: ButtonType;
  disabled?: boolean;
  isFull?: boolean;
  size?: ButtonSize;
  iconName?: IconNames;
  typeButton?: ButtonHTMLAttributes['type'];
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary' as ButtonType,
  disabled: false,
  isFull: false,
  size: 'medium' as ButtonSize,
  iconName: undefined,
  typeButton: 'button' as ButtonHTMLAttributes['type'],
  loading: false,
});

const { data: t } = useTranslationsQuery();
</script>

<template>
  <button
    :type="typeButton || 'button'"
    :class="{
      [`btn-${props.type}__${props.size}`]: true,
      'w-full': isFull,
      loading: props.loading,
    }"
    :disabled="props.disabled || props.loading"
  >
    <i class="spinner" v-if="props.loading" />
    <Icon
      :name="iconName"
      :size="props.type !== 'navigate' ? '16' : '22'"
      v-if="iconName && !props.loading"
    />
    <span v-if="props.loading">
      {{ t?.m5000_3915 || 'Cargando' }}
    </span>
    <span v-else>
      <slot />
    </span>
  </button>
</template>

<style scoped>
:root {
  --btn-radius-default: 1.43rem;
  --btn-radius-large: 1.87rem;
  --btn-padding-x: 1.5rem;
  --btn-padding-y: 0.5rem;
  --btn-padding-y-large: 0.75rem;
}

.spinner {
  @apply w-4 h-4 animate-spin rounded-full border-2 border-solid border-primary-light border-t-primary;
}

.btn {
  @apply my-auto flex items-center justify-center gap-2 text-base font-bold text-neutral;
  border-radius: var(--btn-radius-default);
  padding: var(--btn-padding-y) var(--btn-padding-x);
}

.btn span {
  @apply whitespace-nowrap;
}

/* Size variations */
.btn__small {
  @apply my-auto flex items-center justify-center gap-2 text-xs font-bold text-neutral;
  border-radius: var(--btn-radius-default);
  padding: var(--btn-padding-y) var(--btn-padding-x);
}

.btn__medium {
  @apply my-auto flex items-center justify-center gap-2 text-base font-bold text-neutral;
  border-radius: var(--btn-radius-default);
  padding: var(--btn-padding-y) var(--btn-padding-x);
}

.btn__large {
  @apply my-auto flex items-center justify-center gap-2 text-base font-bold text-neutral;
  border-radius: var(--btn-radius-large);
  padding: var(--btn-padding-y-large) var(--btn-padding-x);
}

/* Button types with nested selectors */
.btn-primary {
  @apply bg-primary;

  &:hover {
    @apply opacity-30;
  }

  &:disabled {
    @apply bg-neutral-300 opacity-100;
  }

  &.loading {
    @apply opacity-30;
  }

  &__small {
    @apply my-auto flex items-center justify-center gap-2 text-xs font-bold text-neutral bg-primary;
    border-radius: var(--btn-radius-default);
    padding: var(--btn-padding-y) var(--btn-padding-x);

    &:hover {
      @apply opacity-30;
    }

    &:disabled {
      @apply bg-neutral-300 opacity-100;
    }
  }

  &__medium {
    @apply my-auto flex items-center justify-center gap-2 text-base font-bold text-neutral bg-primary;
    border-radius: var(--btn-radius-default);
    padding: var(--btn-padding-y) var(--btn-padding-x);

    &:hover {
      @apply opacity-30;
    }

    &:disabled {
      @apply bg-neutral-300 opacity-100;
    }
  }

  &__large {
    @apply my-auto flex items-center justify-center gap-2 text-base font-bold text-neutral bg-primary;
    border-radius: var(--btn-radius-large);
    padding: var(--btn-padding-y-large) var(--btn-padding-x);

    &:hover {
      @apply opacity-30;
    }

    &:disabled {
      @apply bg-neutral-300 opacity-100;
    }
  }
}

.btn-secondary {
  @apply bg-secondary text-neutral;

  &:hover {
    @apply bg-secondary-light;
  }

  &:disabled {
    @apply bg-neutral-300;
  }

  &.loading {
    @apply bg-secondary-light;

    & .spinner {
      @apply border-neutral-400 border-t-neutral-300;
    }
  }

  &__small {
    @apply my-auto flex items-center justify-center gap-2 text-xs font-bold text-neutral bg-secondary;
    border-radius: var(--btn-radius-default);
    padding: var(--btn-padding-y) var(--btn-padding-x);

    &:hover {
      @apply bg-secondary-light;
    }

    &:disabled {
      @apply bg-neutral-300;
    }
  }

  &__medium {
    @apply my-auto flex items-center justify-center gap-2 text-base font-bold text-neutral bg-secondary;
    border-radius: var(--btn-radius-default);
    padding: var(--btn-padding-y) var(--btn-padding-x);

    &:hover {
      @apply bg-secondary-light;
    }

    &:disabled {
      @apply bg-neutral-300;
    }
  }

  &__large {
    @apply my-auto flex items-center justify-center gap-2 text-base font-bold text-neutral bg-secondary;
    border-radius: var(--btn-radius-large);
    padding: var(--btn-padding-y-large) var(--btn-padding-x);

    &:hover {
      @apply bg-secondary-light;
    }

    &:disabled {
      @apply bg-neutral-300;
    }
  }
}

.btn-secondary-white {
  @apply bg-neutral text-secondary;

  &:hover {
    @apply bg-neutral-200 text-neutral;
  }

  &:disabled {
    @apply bg-neutral-300 text-neutral;
  }

  &__small {
    @apply my-auto flex items-center justify-center gap-2 text-xs font-bold bg-neutral text-secondary;
    border-radius: var(--btn-radius-default);
    padding: var(--btn-padding-y) var(--btn-padding-x);

    &:hover {
      @apply bg-neutral-200 text-neutral;
    }

    &:disabled {
      @apply bg-neutral-300 text-neutral;
    }
  }

  &__medium {
    @apply my-auto flex items-center justify-center gap-2 text-base font-bold bg-neutral text-secondary;
    border-radius: var(--btn-radius-default);
    padding: var(--btn-padding-y) var(--btn-padding-x);

    &:hover {
      @apply bg-neutral-200 text-neutral;
    }

    &:disabled {
      @apply bg-neutral-300 text-neutral;
    }
  }

  &__large {
    @apply my-auto flex items-center justify-center gap-2 text-base font-bold bg-neutral text-secondary;
    border-radius: var(--btn-radius-large);
    padding: var(--btn-padding-y-large) var(--btn-padding-x);

    &:hover {
      @apply bg-neutral-200 text-neutral;
    }

    &:disabled {
      @apply bg-neutral-300 text-neutral;
    }
  }
}

.btn-tertiary {
  @apply bg-tertiary text-secondary;

  &:hover {
    @apply bg-neutral-100;
  }

  &:disabled {
    @apply bg-neutral-300;
  }

  &__small {
    @apply my-auto flex items-center justify-center gap-2 text-xs font-bold bg-tertiary text-secondary;
    border-radius: var(--btn-radius-default);
    padding: var(--btn-padding-y) var(--btn-padding-x);

    &:hover {
      @apply bg-neutral-100;
    }

    &:disabled {
      @apply bg-neutral-300;
    }
  }

  &__medium {
    @apply my-auto flex items-center justify-center gap-2 text-base font-bold bg-tertiary text-secondary;
    border-radius: var(--btn-radius-default);
    padding: var(--btn-padding-y) var(--btn-padding-x);

    &:hover {
      @apply bg-neutral-100;
    }

    &:disabled {
      @apply bg-neutral-300;
    }
  }

  &__large {
    @apply my-auto flex items-center justify-center gap-2 text-base font-bold bg-tertiary text-secondary;
    border-radius: var(--btn-radius-large);
    padding: var(--btn-padding-y-large) var(--btn-padding-x);

    &:hover {
      @apply bg-neutral-100;
    }

    &:disabled {
      @apply bg-neutral-300;
    }
  }
}

.btn-outline {
  @apply my-auto flex items-center justify-center gap-2 border border-secondary text-base font-bold text-secondary;
  border-radius: 1.5rem;
  padding: 0.438rem 1.438rem;

  &:hover {
    @apply border-primary text-primary;
  }

  &:disabled {
    @apply border-secondary-light text-neutral-300;
  }

  &__small {
    @apply my-auto flex items-center justify-center gap-2 text-xs font-bold border border-secondary text-secondary;
    border-radius: 1.5rem;
    padding: 0.438rem 1.438rem;

    &:hover {
      @apply border-primary text-primary;
    }

    &:disabled {
      @apply border-secondary-light text-neutral-300;
    }
  }

  &__medium {
    @apply my-auto flex items-center justify-center gap-2 text-base font-bold border border-secondary text-secondary;
    border-radius: 1.5rem;
    padding: 0.438rem 1.438rem;

    &:hover {
      @apply border-primary text-primary;
    }

    &:disabled {
      @apply border-secondary-light text-neutral-300;
    }
  }

  &__large {
    @apply my-auto flex items-center justify-center gap-2 text-base font-bold border border-secondary text-secondary;
    border-radius: var(--btn-radius-large);
    padding: var(--btn-padding-y-large) 1.438rem;

    &:hover {
      @apply border-primary text-primary;
    }

    &:disabled {
      @apply border-secondary-light text-neutral-300;
    }
  }
}

.btn-text {
  @apply my-auto flex items-center justify-center gap-2 w-auto border-b border-secondary text-base font-bold text-secondary shadow-none;
  border-radius: 0;
  padding: 0.375rem var(--btn-padding-x);

  &:hover {
    @apply border-b border-primary text-primary;
  }

  &:disabled {
    @apply border-b border-opacity-0 text-neutral-300;
  }

  &__small {
    @apply my-auto flex items-center justify-center gap-2 w-auto border-b border-secondary text-xs font-bold text-secondary shadow-none;
    border-radius: 0;
    padding: 0.375rem var(--btn-padding-x);

    &:hover {
      @apply border-b border-primary text-primary;
    }

    &:disabled {
      @apply border-b border-opacity-0 text-neutral-300;
    }
  }

  &__medium {
    @apply my-auto flex items-center justify-center gap-2 w-auto border-b border-secondary text-base font-bold text-secondary shadow-none;
    border-radius: 0;
    padding: 0.375rem var(--btn-padding-x);

    &:hover {
      @apply border-b border-primary text-primary;
    }

    &:disabled {
      @apply border-b border-opacity-0 text-neutral-300;
    }
  }

  &__large {
    @apply my-auto flex items-center justify-center gap-2 w-auto border-b border-secondary text-base font-bold text-secondary shadow-none;
    border-radius: 0;
    padding: var(--btn-padding-y-large) var(--btn-padding-x);

    &:hover {
      @apply border-b border-primary text-primary;
    }

    &:disabled {
      @apply border-b border-opacity-0 text-neutral-300;
    }
  }
}

.btn-navigate {
  @apply my-auto flex items-center justify-center bg-neutral-200 text-secondary;
  border-radius: 1.5rem;
  padding: 0.5rem 1rem;
  gap: 0.25rem;

  &:hover {
    @apply text-neutral;
  }

  &:disabled {
    @apply bg-neutral-100 text-neutral-200;
  }

  &__medium {
    @apply my-auto flex items-center justify-center bg-neutral-200 text-secondary;
    border-radius: 1.5rem;
    padding: 0.5rem 1rem;
    gap: 0.25rem;

    &:hover {
      @apply text-neutral;
    }

    &:disabled {
      @apply bg-neutral-100 text-neutral-200;
    }
  }
}

.btn-icon {
  @apply flex items-center justify-center h-8 w-8 rounded-full;

  &:hover {
    @apply bg-tertiary-light;
  }

  &__medium {
    @apply flex items-center justify-center h-8 w-8 rounded-full;

    &:hover {
      @apply bg-tertiary-light;
    }
  }
}
</style>
