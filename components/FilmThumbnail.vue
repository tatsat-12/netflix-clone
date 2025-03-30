<template>
  <div
    class="movie-thumbnail"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
    role="button"
    tabindex="0"
    :aria-label="`View details for ${movie.Title}`"
  >
    <figure>
      <img :src="posterUrl" :alt="`Poster of ${movie.Title}`" />
    </figure>
    <div>
      <h3>{{ movie.Title }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";

// Define props with expected structure
const props = defineProps<{
  movie: {
    imdbID: string;
    Title: string;
    Poster: string;
  };
}>();

// Define typed emit for click event
const emit = defineEmits<{ (event: "click"): void }>();

// Handler to emit click events
const handleClick = () => {
  emit("click");
};

// Computed property for poster URL with fallback logic
const posterUrl = computed(() =>
  props.movie.Poster !== "N/A" ? props.movie.Poster : "/placeholder.jpg"
);
</script>
