<template>
  <div>
    <h2>Store Tester</h2>
    <button @click="testingScore">Add Test Movie</button>
    <div v-if="movie">
      <h3>{{ movie?.Title }}</h3>
      <p>{{ movie?.Year }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMoviesStore } from "@/stores/movies";
import { ref } from "vue";

const store = useMoviesStore();
const movie = ref(store.getFilm("tt0050083"));

const movieTest = {
  imdbID: "tt0050083",
  Title: "Test Movie",
  Year: "2021",
  Poster: "N/A",
};

function testingScore() {
  store.addFilm(movieTest);
  movie.value = store.getFilm("tt0050083");
}
</script>

<style scoped>
h2 {
  color: #2c3e50;
}
</style>
