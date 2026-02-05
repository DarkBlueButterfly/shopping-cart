import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import babelPluginStyledComponents from "babel-plugin-styled-components";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [babelPluginStyledComponents],
      },
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
  },
});
