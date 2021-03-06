// Import additional Types
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// give vite the ability to resolve imports using TypeScript's path mapping
// takes path of tsconfig
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [tsconfigPaths(), react()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: 'src/tests/setupTests.ts'
	}
});
