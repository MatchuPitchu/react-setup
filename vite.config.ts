/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// vite-plugin-svgr allow to import SVGs as React components.
// Example: import { ReactComponent as Logo } from './logo.svg'.
import svgrPlugin from 'vite-plugin-svgr';
// adds tsc --watch into vite dev server
import { tscPlugin } from 'vite-plugin-tsc-watch';
// give vite the ability to resolve imports using TypeScript's path mapping
// takes path of tsconfig
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgrPlugin(), tscPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/tests/setupTests.ts'
  }
});
