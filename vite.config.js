import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
  base: '/shadow-siege/',
  plugins: [
    checker({
      typescript: true,
    }),
  ],
});
