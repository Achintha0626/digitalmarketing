
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // existing
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      // new: proxy image requests
      "/uploads": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
