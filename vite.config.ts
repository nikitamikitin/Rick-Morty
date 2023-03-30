import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Rick-Morty/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      components: `${path.resolve(__dirname, './src/components/')}`,
      models: `${path.resolve(__dirname, './src/models')}`,
      constants: `${path.resolve(__dirname, './src/constants/')}`,
      services: `${path.resolve(__dirname, './src/services/')}`,
      hooks: `${path.resolve(__dirname, './src/services/hooks')}`,
    },
  },
});
