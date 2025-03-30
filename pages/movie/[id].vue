<template>
  <div>
    <div class="d-flex justify-content-between align-items-center py-3">
      <NuxtLink to="/" aria-label="Back to Home" class="back-button">
        <span class="arrow">←</span> Back to Home
      </NuxtLink>
    </div>

    <main>
      <div
        class="loader-container"
        role="status"
        aria-live="polite"
        v-if="isLoading"
      >
        <div class="loader"></div>
      </div>

      <!-- Error state -->
      <div class="loader-container flex-column" v-else-if="hasError">
        <h2>Sorry, we couldn't load the movies. Please try again later.</h2>
        <img
          src="../assets/images/not-found-emoji.png"
          alt="Not found"
          class="img-not-found"
        />
      </div>

      <!-- Movie details -->
      <div v-else>
        <div class="d-flex card">
          <div class="poster-wrapper">
            <img :src="posterUrl" :alt="`Poster of ${movieDetails?.Title}`" />
          </div>
          <div class="info">
            <h1 class="fs-40">{{ movieDetails?.Title }}</h1>
            <p>{{ movieDetails?.Plot }}</p>
            <p><strong>Actors:</strong> {{ movieDetails?.Actors }}</p>
            <p><strong>IMDb Rating:</strong> {{ movieDetails?.imdbRating }}</p>
            <p><strong>Genre:</strong> {{ movieDetails?.Genre }}</p>
            <p><strong>Director:</strong> {{ movieDetails?.Director }}</p>
            <p><strong>Runtime:</strong> {{ movieDetails?.Runtime }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useMoviesStore } from "../../stores/movies";

const route = useRoute(); // Access current route
const store = useMoviesStore(); // Pinia store

const imdbID = ref(route.params.id as string); // Movie ID from route
const movieDetails = ref<any>(null); // Movie data
const isLoading = ref(true); // Loading state
const hasError = ref(false); // Error state

const posterUrl = computed(() =>
  movieDetails.value?.Poster && movieDetails.value.Poster !== "N/A"
    ? movieDetails.value.Poster
    : "/placeholder.jpg"
);

const fetchMovieDetails = async (id: string) => {
  isLoading.value = true;
  hasError.value = false;
  movieDetails.value = null;

  try {
    const existing = store.getFilm(id);
    if (existing) {
      movieDetails.value = existing;
    } else {
      const fetched = await store.fetchMovie(id);
      movieDetails.value = fetched ?? null;
      hasError.value = !fetched;
    }
  } catch (err) {
    console.error("Error loading movie:", err);
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchMovieDetails(imdbID.value);
});

watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      imdbID.value = newId as string;
      fetchMovieDetails(imdbID.value);
    }
  }
);
</script>

<style scoped>
.info {
  p {
    margin-top: 0;
  }
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: #ffffff;
  border: 2px solid #db0d20;
  color: #db0d20;
  font-weight: 600;
  font-size: 14px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.back-button .arrow {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.back-button:hover {
  background-color: #db0d20;
  color: #ffffff;
}

.back-button:hover .arrow {
  transform: translateX(-3px);
}
</style>
