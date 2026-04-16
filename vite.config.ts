import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    nitro({
      scanDirs: ["server"],
      routeRules: {
        "/sitemap.xml": {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
          },
        },
        "/robots.txt": {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
          },
        },
      },
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
});
