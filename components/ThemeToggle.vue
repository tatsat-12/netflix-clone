<template>

  <h2 class="main-heading" v-if="!isMovieList">List of Movies</h2>

  <div class="theme-toggle-wrapper">
    <button
      @click="handleThemeToggle"
      class="theme-toggle cursor-pointer"
      :title="themeTitle"
      :aria-label="themeAriaLabel"
    >
      {{ themeIcon }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
const theme = ref("light"); 
const route = useRoute(); 

const isMovieList = computed(() => route.path.includes("/movie"));

const themeIcon = computed(() => (theme.value === "light" ? "🌑" : "🌞"));

const themeTitle = computed(() =>
  theme.value === "light" ? "Toggle to Dark Theme" : "Toggle to Light Theme"
);

const themeAriaLabel = computed(
  () => `Switch to ${theme.value === "light" ? "dark" : "light"} theme`
);

const applyTheme = (themeName: string) => {
  document.documentElement.setAttribute("data-theme", themeName);
};

const handleThemeToggle = () => {
  const newTheme = theme.value === "light" ? "dark" : "light";
  theme.value = newTheme;
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
};

onMounted(() => {
  const storedTheme = localStorage.getItem("theme");
  theme.value = storedTheme ?? theme.value;
  applyTheme(theme.value);
});
</script>
