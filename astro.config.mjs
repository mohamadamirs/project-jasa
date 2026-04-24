// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://kutabaru.id',
  integrations: [sitemap(), react()],
  vite: {
    plugins: [tailwindcss()]
  }
});