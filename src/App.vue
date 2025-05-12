<script setup lang="ts">
import Button from './components/Button/Button.vue'
</script>

<template>
  <div class="flex flex-col gap-4 items-center justify-center">
    <!-- Primary buttons -->
    <h3 class="font-bold mt-8 text-xl">Primary Buttons</h3>

    <!-- Smaller size -->
    <h4 class="mt-4">Smaller</h4>
    <div class="flex flex-wrap gap-2 w-full px-4">
      <Button type="primary" size="smaller" text="Smaller" />
      <Button type="primary" size="smaller" text="Smaller Loading" loading />
      <Button type="primary" size="smaller" text="Smaller Disabled" disabled />
      <Button type="primary" size="smaller" text="Smaller Full" isFull />
      <Button type="primary" size="smaller" text="Smaller Selected" selected />
    </div>

    <!-- Small size -->
    <h4 class="mt-4">Small</h4>
    <div class="flex flex-wrap gap-2 w-full px-4">
      <Button type="primary" size="small" text="Small" />
      <Button type="primary" size="small" text="Small Loading" loading />
      <Button type="primary" size="small" text="Small Disabled" disabled />
      <Button type="primary" size="small" text="Small Full" isFull />
      <Button type="primary" size="small" text="Small Selected" selected />
    </div>

    <!-- Medium size -->
    <h4 class="mt-4">Medium</h4>
    <div class="flex flex-wrap gap-2 w-full px-4">
      <Button type="primary" size="medium" text="Medium" />
      <Button type="primary" size="medium" text="Medium Loading" loading />
      <Button type="primary" size="medium" text="Medium Disabled" disabled />
      <Button type="primary" size="medium" text="Medium Full" isFull />
      <Button type="primary" size="medium" text="Medium Selected" selected />
    </div>

    <!-- Large size -->
    <h4 class="mt-4">Large</h4>
    <div class="flex flex-wrap gap-2 w-full px-4">
      <Button type="primary" size="large" text="Large" />
      <Button type="primary" size="large" text="Large Loading" loading />
      <Button type="primary" size="large" text="Large Disabled" disabled />
      <Button type="primary" size="large" text="Large Full" isFull />
      <Button type="primary" size="large" text="Large Selected" selected />
    </div>

    <!-- Auto size -->
    <h4 class="mt-4">Auto</h4>
    <div class="flex flex-wrap gap-2 w-full px-4">
      <Button type="primary" size="auto" text="Auto" />
      <Button type="primary" size="auto" text="Auto Loading" loading />
      <Button type="primary" size="auto" text="Auto Disabled" disabled />
      <Button type="primary" size="auto" text="Auto Full" isFull />
      <Button type="primary" size="auto" text="Auto Selected" selected />
    </div>

    <!-- Secondary buttons -->
    <h3 class="font-bold mt-8 text-xl">Secondary Buttons</h3>

    <!-- Smaller size -->
    <h4 class="mt-4">Smaller</h4>
    <div class="flex flex-wrap gap-2 w-full px-4">
      <Button type="secondary" size="smaller" text="Smaller" />
      <Button type="secondary" size="smaller" text="Smaller Loading" loading />
      <Button type="secondary" size="smaller" text="Smaller Disabled" disabled />
      <Button type="secondary" size="smaller" text="Smaller Full" isFull />
      <Button type="secondary" size="smaller" text="Smaller Selected" selected />
    </div>

    <!-- Small size -->
    <h4 class="mt-4">Small</h4>
    <div class="flex flex-wrap gap-2 w-full px-4">
      <Button type="secondary" size="small" text="Small" />
      <Button type="secondary" size="small" text="Small Loading" loading />
      <Button type="secondary" size="small" text="Small Disabled" disabled />
      <Button type="secondary" size="small" text="Small Full" isFull />
      <Button type="secondary" size="small" text="Small Selected" selected />
    </div>

    <!-- Medium size -->
    <h4 class="mt-4">Medium</h4>
    <div class="flex flex-wrap gap-2 w-full px-4">
      <Button type="secondary" size="medium" text="Medium" />
      <Button type="secondary" size="medium" text="Medium Loading" loading />
      <Button type="secondary" size="medium" text="Medium Disabled" disabled />
      <Button type="secondary" size="medium" text="Medium Full" isFull />
      <Button type="secondary" size="medium" text="Medium Selected" selected />
    </div>

    <!-- Large size -->
    <h4 class="mt-4">Large</h4>
    <div class="flex flex-wrap gap-2 w-full px-4">
      <Button type="secondary" size="large" text="Large" />
      <Button type="secondary" size="large" text="Large Loading" loading />
      <Button type="secondary" size="large" text="Large Disabled" disabled />
      <Button type="secondary" size="large" text="Large Full" isFull />
      <Button type="secondary" size="large" text="Large Selected" selected />
    </div>

    <!-- Auto size -->
    <h4 class="mt-4">Auto</h4>
    <div class="flex flex-wrap gap-2 w-full px-4">
      <Button type="secondary" size="auto" text="Auto" />
      <Button type="secondary" size="auto" text="Auto Loading" loading />
      <Button type="secondary" size="auto" text="Auto Disabled" disabled />
      <Button type="secondary" size="auto" text="Auto Full" isFull />
      <Button type="secondary" size="auto" text="Auto Selected" selected />
    </div>

    <!-- Outline buttons -->
    <h3 class="font-bold mt-8 text-xl">Outline Buttons</h3>

    <!-- Smaller size -->
    <h4 class="mt-4">Smaller</h4>
    <div class="flex flex-wrap gap-2 w-full px-4">
      <Button type="outline" size="smaller" text="Smaller" />
      <Button type="outline" size="smaller" text="Smaller Loading" loading />
      <Button type="outline" size="smaller" text="Smaller Disabled" disabled />
      <Button type="outline" size="smaller" text="Smaller Full" isFull />
      <Button type="outline" size="smaller" text="Smaller Selected" selected />
    </div>

    <!-- Small size -->
    <h4 class="mt-4">Small</h4>
    <div class="flex flex-wrap gap-2 w-full px-4">
      <Button type="outline" size="small" text="Small" />
      <Button type="outline" size="small" text="Small Loading" loading />
      <Button type="outline" size="small" text="Small Disabled" disabled />
      <Button type="outline" size="small" text="Small Full" isFull />
      <Button type="outline" size="small" text="Small Selected" selected />
    </div>

    <!-- Medium size -->
    <h4 class="mt-4">Medium</h4>
    <div class="flex flex-wrap gap-2 w-full px-4">
      <Button type="outline" size="medium" text="Medium" />
      <Button type="outline" size="medium" text="Medium Loading" loading />
      <Button type="outline" size="medium" text="Medium Disabled" disabled />
      <Button type="outline" size="medium" text="Medium Full" isFull />
      <Button type="outline" size="medium" text="Medium Selected" selected />
    </div>

    <!-- Large size -->
    <h4 class="mt-4">Large</h4>
    <div class="flex flex-wrap gap-2 w-full px-4">
      <Button type="outline" size="large" text="Large" />
      <Button type="outline" size="large" text="Large Loading" loading />
      <Button type="outline" size="large" text="Large Disabled" disabled />
      <Button type="outline" size="large" text="Large Full" isFull />
      <Button type="outline" size="large" text="Large Selected" selected />
    </div>

    <!-- Auto size -->
    <h4 class="mt-4">Auto</h4>
    <div class="flex flex-wrap gap-2 w-full px-4">
      <Button type="outline" size="auto" text="Auto" />
      <Button type="outline" size="auto" text="Auto Loading" loading />
      <Button type="outline" size="auto" text="Auto Disabled" disabled />
      <Button type="outline" size="auto" text="Auto Full" isFull />
      <Button type="outline" size="auto" text="Auto Selected" selected />
    </div>

    <!-- Text buttons -->
    <h3 class="font-bold mt-8 text-xl">Text Buttons</h3>

    <!-- Smaller size -->
    <h4 class="mt-4">Smaller</h4>
    <div class="flex flex-wrap gap-2 w-full px-4">
      <Button type="text" size="smaller" text="Smaller" />
      <Button type="text" size="smaller" text="Smaller Loading" loading />
      <Button type="text" size="smaller" text="Smaller Disabled" disabled />
      <Button type="text" size="smaller" text="Smaller Full" isFull />
      <Button type="text" size="smaller" text="Smaller Selected" selected />
    </div>

    <!-- Small size -->
    <h4 class="mt-4">Small</h4>
    <div class="flex flex-wrap gap-2 w-full px-4">
      <Button type="text" size="small" text="Small" />
      <Button type="text" size="small" text="Small Loading" loading />
      <Button type="text" size="small" text="Small Disabled" disabled />
      <Button type="text" size="small" text="Small Full" isFull />
      <Button type="text" size="small" text="Small Selected" selected />
    </div>

    <!-- Medium size -->
    <h4 class="mt-4">Medium</h4>
    <div class="flex flex-wrap gap-2 w-full px-4">
      <Button type="text" size="medium" text="Medium" />
      <Button type="text" size="medium" text="Medium Loading" loading />
      <Button type="text" size="medium" text="Medium Disabled" disabled />
      <Button type="text" size="medium" text="Medium Full" isFull />
      <Button type="text" size="medium" text="Medium Selected" selected />
    </div>

    <!-- Large size -->
    <h4 class="mt-4">Large</h4>
    <div class="flex flex-wrap gap-2 w-full px-4">
      <Button type="text" size="large" text="Large" />
      <Button type="text" size="large" text="Large Loading" loading />
      <Button type="text" size="large" text="Large Disabled" disabled />
      <Button type="text" size="large" text="Large Full" isFull />
      <Button type="text" size="large" text="Large Selected" selected />
    </div>

    <!-- Auto size -->
    <h4 class="mt-4">Auto</h4>
    <div class="flex flex-wrap gap-2 w-full px-4">
      <Button type="text" size="auto" text="Auto" />
      <Button type="text" size="auto" text="Auto Loading" loading />
      <Button type="text" size="auto" text="Auto Disabled" disabled />
      <Button type="text" size="auto" text="Auto Full" isFull />
      <Button type="text" size="auto" text="Auto Selected" selected />
    </div>

    <!-- Icon buttons -->
    <h3 class="font-bold mt-8 text-xl ">Icon Buttons</h3>

    <!-- Smaller size -->
    <h4 class="mt-4">Smaller</h4>
    <div class="flex flex-wrap gap-2 w-full px-4">
      <Button type="icon" size="smaller" />
      <Button type="icon" size="smaller" loading />
      <Button type="icon" size="smaller" disabled />
      <Button type="icon" size="smaller" selected />
    </div>

    <!-- Small size -->
    <h4 class="mt-4">Small</h4>
    <div class="flex flex-wrap gap-2 w-full px-4">
      <Button type="icon" size="small" />
      <Button type="icon" size="small" loading />
      <Button type="icon" size="small" disabled />
      <Button type="icon" size="small" selected />
    </div>

    <!-- Medium size -->
    <h4 class="mt-4">Medium</h4>
    <div class="flex flex-wrap gap-2 w-full px-4">
      <Button type="icon" size="medium" />
      <Button type="icon" size="medium" loading />
      <Button type="icon" size="medium" disabled />
      <Button type="icon" size="medium" selected />
    </div>

    <!-- Large size -->
    <h4 class="mt-4">Large</h4>
    <div class="flex flex-wrap gap-2 w-full px-4">
      <Button type="icon" size="large" />
      <Button type="icon" size="large" loading />
      <Button type="icon" size="large" disabled />
      <Button type="icon" size="large" selected />
    </div>

    <!-- Auto size -->
    <h4 class="mt-4">Auto</h4>
    <div class="flex flex-wrap gap-2 w-full px-4">
      <Button type="icon" size="auto" />
      <Button type="icon" size="auto" loading />
      <Button type="icon" size="auto" disabled />
      <Button type="icon" size="auto" selected />
    </div>
  </div>
</template>

<style scoped>
@import '@/style.css';
</style>
