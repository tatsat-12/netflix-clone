<template>
  <div></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// Reactive theme state
const theme = ref("light");

const initializeTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  theme.value = storedTheme ?? theme.value;
};

onMounted(() => {
  initializeTheme();
});
</script>
