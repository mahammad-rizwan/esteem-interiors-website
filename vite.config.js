import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// BASE_PATH is set by scripts/deploy.mjs for GitHub Pages (e.g. "/esteem-interiors-website/").
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
});
