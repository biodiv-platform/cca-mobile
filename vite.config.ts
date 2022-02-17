import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { ViteAliases } from "vite-aliases";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ViteAliases({ useTypescript: true }), react()],
  root: "./",
  build: {
    outDir: "build"
  },
  publicDir: "public"
});
