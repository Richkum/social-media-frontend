import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      tailwind: {
        config: "./tailwind.config.js",
      },
    },
  },
  server: {
    host: true,
    port: 3000,
  },
});
