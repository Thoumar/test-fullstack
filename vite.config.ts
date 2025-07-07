/// <reference types='vitest' />
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: './node_modules/.vite/src',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react(), nxViteTsPaths()],

  build: {
    outDir: 'frontend/dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  resolve: {
    alias: {
      '@climadex/shared': path.resolve(__dirname, 'shared/src'),
      utils: path.resolve(__dirname, 'frontend/src/utils'),
      config: path.resolve(__dirname, 'frontend/src/config'),
      services: path.resolve(__dirname, 'frontend/src/services'),
      hooks: path.resolve(__dirname, 'frontend/src/hooks'),
      components: path.resolve(__dirname, 'frontend/src/components'),
      pages: path.resolve(__dirname, 'frontend/src/pages'),
      common: path.resolve(__dirname, 'frontend/src/common'),
    },
  },

  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: './coverage/industry',
      provider: 'v8',
    },
  },
});
