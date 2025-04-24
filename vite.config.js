import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === "gradio-app",
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // `@` 代表 `src` 目录
    },
  },
  optimizeDeps: {
    include: ["@kangc/v-md-editor/lib/theme/vuepress.js"],
  },
  server: {
    proxy: {
      "/api/chat": {
        target: "https://my-chat-proxy.workers.dev",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/chat/, ""),
      },
    },
  },
});
