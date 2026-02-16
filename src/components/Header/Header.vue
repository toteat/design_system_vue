<script setup lang="ts">
import type { HeaderProps } from '@/types';

const props = withDefaults(defineProps<HeaderProps>(), {
  headers: () => [],
  spaceBetween: false,
});
</script>

<template>
  <section
    class="tot-ds-root header"
    :class="{ 'header--space-between': props.spaceBetween }"
  >
    <div v-for="(header, _) in props.headers" :key="_" class="header__item">
      <p class="header__title">
        {{ header.title }}
      </p>
      <p v-if="header.description" class="header__description">
        {{ header.description }}
      </p>
    </div>
  </section>
</template>

<style scoped>
@import '../../style.css';

.tot-ds-root.header {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-2xl);
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-lg);
  background-color: var(--color-neutral-100);
}

.header--space-between {
  justify-content: space-between;
}

.header__item {
  display: flex;
  flex-direction: column;
  width: auto;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.header__title {
  font-size: var(--text-base);
  line-height: var(--text-base--line-height);
  font-weight: 800;
  color: var(--color-secondary);
}

.header__description {
  font-size: 0.625rem;
  line-height: 1;
  font-weight: 400;
  color: var(--color-neutral-500);
}
</style>
