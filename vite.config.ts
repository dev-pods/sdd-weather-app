import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Base path for GitHub Pages. The app is published under /<repo>/app/.
// Override with VITE_BASE when needed (e.g. local dev uses '/').
const base = process.env.VITE_BASE ?? '/';

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    include: ['tests/unit/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/main.tsx', 'src/**/*.d.ts'],
    },
  },
});
