import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Tech.care/", // Ye line correct honi chahiye
  server: {
    historyApiFallback: true, // Fixes routing issues
  }
});

