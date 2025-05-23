// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

import { fileURLToPath, URL } from 'url';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Converte o URL do módulo para um caminho de arquivo e pega o dirname
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
