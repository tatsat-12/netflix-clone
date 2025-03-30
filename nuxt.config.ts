// nuxt.config.ts

import { NuxtConfig } from "@nuxt/types";

const config: NuxtConfig = {
  // Target: 'static' for static hosting or 'server' for server-side rendering
  target: "static",

  // Global CSS
  css: [
    // SCSS file in the project
    "@/assets/styles/main.scss",
  ],

  // Plugins to run before rendering page
  plugins: [],

  // Auto import components
  components: true,

  // Modules for dev and build (recommended)
  buildModules: [
    // TypeScript
    "@nuxt/typescript-build",
  ],

  // Modules
  modules: ["@pinia/nuxt"],
  typescript: {
    strict: true,
  },
  // Build Configuration
  build: {
    loaders: {
      scss: {
        implementation: require("sass"),
      },
    },
  },
  runtimeConfig: {
    public: {
      omdbApiKey: process.env.OMDB_API_KEY,
    },
  },
};

export default config;
