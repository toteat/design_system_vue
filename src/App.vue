<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ImagePreview from '@/components/ImagePreview/ImagePreview.vue';
import axios from 'axios';

const images = ref<Array<{ id: string; author: string; download_url: string }>>(
  [],
);
const isLoading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    const response = await axios.get(
      'https://picsum.photos/v2/list?page=2&limit=100',
    );
    images.value = response.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message;
    } else {
      error.value = 'Unknown error';
    }
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col gap-4 items-center justify-center">
    <h1>Toteat Design System</h1>

    <div>
      <div v-if="isLoading">Loading images...</div>
      <div v-else-if="error">Error: {{ error }}</div>
      <div v-else class="grid grid-rows-auto grid-cols-auto gap-4">
        <div v-for="img in images" :key="img.id">
          <ImagePreview
            :image-src="img.download_url"
            :alt="img.author"
            :width="200"
            :height="200"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/style.css';

.grid {
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  width: 100%;
}
</style>
