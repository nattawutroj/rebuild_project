import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false,
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/react-dom")
          ) {
            return "react";
          }
          if (
            id.includes("node_modules/lodash") ||
            id.includes("node_modules/date-fns")
          ) {
            return "utils";
          }
          // if (id.includes('node_modules/@radix-ui') || id.includes('node_modules/lucide-react')) {
          //   return 'ui-components';
          // }
          // if (id.includes("node_modules/axios")) {
          //   return "axios";
          // }
          // if (
          //   id.includes("node_modules/@tanstack/react-query") ||
          //   id.includes("node_modules/@tanstack/react-query-devtools")
          // ) {
          //   return "react-query";
          // }
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
});
