import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    nitro({
      scanDirs: ['server'],
      routeRules: {
        '/sitemap.xml': {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8'
          }
        },
        '/robots.txt': {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8'
          }
        }
      }
    }),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})
