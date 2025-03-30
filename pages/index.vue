<template>
  <div class="toggle-modes">
    <ThemeToggle />
  </div>

  <div class="home-page">
    <main>
      <!-- Loading State -->
      <div class="loader-container" v-if="isLoading">
        <div class="loader"></div>
      </div>

      <!-- Error State -->
      <div class="loader-container flex-column" v-else-if="hasError">
        <h2>Sorry, we couldn't load the movies. Please try again later.</h2>
        <img
          src="../assets/images/not-found-emoji.png"
          alt="Not found"
          class="img-not-found"
        />
      </div>

      <!-- Movie Sections -->
      <div v-else>
        <h1 class="sub-heading">Trending Now</h1>
        <div class="list-wrapper">
          <FilmThumbnail
            v-for="movie in movies"
            :key="movie.imdbID"
            :movie="movie"
            @click="handleMovieClick(movie.imdbID)"
          />
        </div>
        <h1 class="sub-heading">Latest Episodes</h1>
        <div class="list-wrapper">
          <FilmThumbnail
            v-for="movie in movies"
            :key="movie.imdbID"
            :movie="movie"
            @click="handleMovieClick(movie.imdbID)"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import FilmThumbnail from "~/components/FilmThumbnail.vue";
import ThemeToggle from "~/components/ThemeToggle.vue";
import { useMoviesStore } from "~/stores/movies";

// Composables & Store
const router = useRouter();
const store = useMoviesStore();

// State
const movies = ref<any[]>([]);
const isLoading = ref(true);
const hasError = ref(false);

// Movie IDs to fetch
const movieIDs = [
  "tt0050083",
  "tt0111161",
  "tt0468569",
  "tt0071562",
  "tt0068646",
];

// Navigate to movie detail page
const handleMovieClick = (imdbID: string) => {
  router.push(`/movie/${imdbID}`);
};

// Fetch all movie data
const fetchAllMovies = async () => {
  try {
    const movieData = await Promise.all(
      movieIDs.map(async (id) => {
        const movie = await store.fetchMovie(id);
        if (!movie) {
          console.warn(`No data for IMDb ID: ${id}`);
        }
        return movie;
      })
    );

    // Filter out nulls
    movies.value = movieData.filter(Boolean);
  } catch (error) {
    console.error("Error fetching movies:", error);
    hasError.value = true;
  } finally {
    isLoading.value = false;
  }
};

// On mount
onMounted(() => {
  fetchAllMovies();
});
</script>
