import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@configs": path.resolve(__dirname, "./src/configs"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@icons": path.resolve(__dirname, "./src/icons"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@static": path.resolve(__dirname, "./src/static"),
      "@theme": path.resolve(__dirname, "./src/theme"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@interfaces": path.resolve(__dirname, ".src/interfaces"),
      "@translations": path.resolve(__dirname, "./src/translations"),
      "@": path.resolve(__dirname, "./src")
    }
  },
  root: "./",
  build: {
    outDir: "build"
  },
  server: {
    port: 3000
  },
  publicDir: "public"
});
