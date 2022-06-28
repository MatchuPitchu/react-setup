# React Setup

- a fast custom React Setup

## Process

- `npm init`: erstellt `package.json`
- Vite Build-Tool for Development Environment: <https://vitejs.dev/>
  - `npm create vite@latest . -- --template react-ts` with React TypeScript Template
  - configuration options are possible in `vite.config.ts`
  - advantage of Vite: `Hot Module Reloading`(HMR) - whenever there is any change to the code, only the changes are updated to the server and the server reflects the new changes
- Vitest Testing Framework with React Testing Library: <https://vitest.dev/>

  - description <https://www.eternaldev.com/blog/testing-a-react-application-with-vitest/>

  - `npm i -D vitest`: install as dev dependency:
  - advantage of Vitest: uses same config as Vite, ensures that test environment is the same as the build environment which increases the reliability of the tests
  - update `vite-config.ts`:

    ```TypeScript
    /// <reference types="vitest" />
    /// <reference types="vite/client" />

    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    // https://vitejs.dev/config/
    export default defineConfig({
    plugins: [react()],
      test: {
        globals: true,
        environment: 'jsdom',
         setupFiles: 'src/tests/setupTests.ts',
      }
    })
    ```

  - install `React Testing Library Jest DOM`: `npm i @testing-library/jest-dom --save-dev`

  - create `setupTests.ts`:

    ```TypeScript
    import '@testing-library/jest-dom';
    ```

  - add types to `tsconfig.json`: `"types": ["vitest/globals", "node", "@testing-library/jest-dom"]`

  - you need to have the DOM functionality replicated in the test environment to properly test React components. `JSDom` helps in getting that environment for test and `React Testing Library` offers more utility functions to help test the components

    - `npm i -D jsdom @testing-library/react`: install as dev dependency

  - add command into `scripts` in `package.json`:
    - `"test": "vitest"`
    - `"coverage": "vitest run --coverage"`
  - changes to Jest use:
    - `jest.fn()` -> `vi.fn()`: always same implementation, but instead of `jest` use `vi`

- Alias Path remapping: define a string value like `@` to indicate a root import path: <https://www.typescriptlang.org/tsconfig#paths>

  ```JSON
  // tsconfig.json
  {
    "compilerOptions": {
      // ...
      "baseUrl": "./src",
      "paths": {
        "@/*": ["./*"]
      }
    },
  }
  ```

  ```TypeScript
  // vite.config.ts
  // ..
  import * as path from 'path';

  // https://vitejs.dev/config/
  export default defineConfig({
    // ..
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  });
  ```

## Still TODO for a good setup

- `ESLint`:
  - Official Docu ESLint: <https://eslint.org/docs/latest/>
  - TypeScript ESLint Plugin: <https://typescript-eslint.io/>
  - search configuration articles for `ESLint` and `TypeScript`
- `Prettier`:
  - Official Docu: <https://prettier.io/docs/en/install.html>
- `styled-components`:
  - Official Docu: <https://styled-components.com/>
- `EditorConfig`:
  - Official Docu: <https://editorconfig.org/>
  - every team member needs an extension for his IDE to use this .editorconfig-file
- DevOps: deployment of code with `continuous integration`
