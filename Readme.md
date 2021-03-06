# React Setup

- a fast custom React Setup with `Vite`, `Vitest` for testing, `EditorConfig`, `ESLint`, `Prettier` and `Husky`

## Process

- `npm init`: creates `package.json`

### Vite Build-Tool for Development Environment

> Documentation: <https://vitejs.dev/>

- `npm create vite@latest . -- --template react-ts` with React TypeScript template
- configuration options: look at `vite.config.ts`
- advantage of `Vite`: `Hot Module Reloading`(HMR) - whenever there is any change to the code, only the changes are updated to the server and the server reflects the new changes

### Vitest Testing Framework with React Testing Library

> Documentation: <https://vitest.dev/>
> Article: <https://www.eternaldev.com/blog/testing-a-react-application-with-vitest/>

- `npm i -D vitest`: install as dev dependency:
- advantage of `Vitest`: uses same config as Vite, ensures that test environment is the same as the build environment which increases the reliability of the tests
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

- add scripts in `package.json`:

  ```JSON
  "script": {
  	"test": "vitest",
  	"coverage": "vitest run --coverage",
  }
  ```

- changes compared to `Jest`:

  - `jest.fn()` -> `vi.fn()`: always same implementation, but instead of `jest` use `vi`

### Alias Path Remapping

- define a string value like `@` to indicate a root path for your imports in your project files: <https://www.typescriptlang.org/tsconfig#paths>

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

- install package `npm i vite-tsconfig-paths` for vite to give `vite` the ability to resolve imports using TypeScript's path mapping

```TypeScript
// vite.config.ts
// ..
import tsconfigPaths from 'vite-tsconfig-paths';


// https://vitejs.dev/config/
export default defineConfig({
	// ..
	plugins: [tsconfigPaths(), react()],
});
```

## Plugins and Extensions

> Tutorial video for setup example with create-react-app, VSCode, Prettier, Husky: <https://www.youtube.com/watch?v=ZXW6Jn6or1w>

### EditorConfig

> Official Documentation and Configuration settings: <https://editorconfig.org/>

- create `.editorconfig`

```Text
# editorconfig.org
# set to true, otherwise EditorConfig looks for .editorconfig file outside of project
root = true

[*]
indent_style = tab
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace =  true
charset = utf-8
# editorconfig-tools is unable to ignore long strings or urls
max_line_length = off

# yaml files don't work with tab indentation
[*.{yml,yaml}]
indent_style = space
```

- install `EditorConfig for VS Code` Plugin or another extension for your IDE to use `.editorconfig`

### ESLint

- Official Documentation ESLint: <https://eslint.org/docs/latest/>
- Plugin `Lintel: ESLint Configuration File Visualizer` for VSCode to visualize, edit and manage ESLint configuration files
- `npm init @eslint/config` to install ESLint with the help of a CLI

  - `To check syntax, find problems, and enforce code style`
  - `JavaScript modules (import/export)`
  - `React`
  - `TypeScript`
  - `Browser`
  - `Answer questions about your style`
  - config file: `JSON`
  - `Tabs` -> `Single` -> `Unix` -> semicolons `Yes` ->

  - `Would you like to install them now: Yes`
  - `Which package manager do you want to use?: npm`

- configure the `.eslintrc.json` file

```JSON
{
	"env": {
		"browser": true,
		"es2021": true
	},
	// plugins inserts plugins in this configuration file -> you can use them in "rules" below
	"plugins": ["react", "@typescript-eslint", "unused-imports"], // prettier should be at the end
	// extends predefines rules
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:import/typescript",
		"plugin:react/jsx-runtime",
		"plugin:react-hooks/recommended",
		"plugin:prettier/recommended" // prettier should be at the end
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": "latest",
		"sourceType": "module",
		"project": "./tsconfig.eslint.json" // TypeScript config file
	},
	"settings": {
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".tsx"]
		},
		"import/resolver": {
			"typescript": {},
			"alias": {
				"map": [["@", "./src"]],
				"extensions": [".ts", ".tsx"]
			}
		}
	},
	// https://eslint.org/docs/latest/rules/
	"rules": {
		"@typescript-eslint/no-unused-vars": "warn",
		"unused-imports/no-unused-imports": "warn",
		"react/jsx-props-no-spreading": "warn",
		"no-shadow": "warn",
		"no-console": "warn",
		"no-lonely-if": "warn",
		"no-nested-ternary": "warn",
		"no-duplicate-imports": "error",
		"eqeqeq": "error",
		"func-names": "warn"
	}
}
```

- list of ESLint rules: <https://eslint.org/docs/latest/rules/>

- add scripts to `package.json`: `.` points at the current config file, `fix` fixes some basic rules automatically

```JSON
"scripts": {
	"lint": "eslint .",
	"lint:fix": "eslint --fix ."
}
```

- `.eslintignore`:

```Text
# don't ever lint node_modules
/node_modules

# don't lint build output (make sure it's set to your correct build folder name)
/dist
/build
/coverage
/.husky
```

- install ESLint plugin for `vite`: `npm i eslint vite-plugin-eslint --save-dev`

  - if using Typescript, install @types/eslint to ensure the full type is exported: `npm i @types/eslint --save-dev`

### Prettier

> Official Documentation: <https://prettier.io/docs/en/install.html>

- install Prettier locally for your project: `npm install --save-dev --save-exact prettier`
- create `.prettierrc.json` for the configuration

```JSON
{
	"singleQuote": true,
	"trailingComma": "none",
	"printWidth": 120
}
```

- create `.prettierignore` file to let Prettier CLI and editors know which files to not format

```Text
# Ignore artifacts:
build
coverage
dist
node_modules
```

- install `npm i --save-dev eslint-plugin-prettier`
- install `npm i --save-dev eslint-config-prettier`: if you use `ESLint`, install `eslint-config-prettier` to make `ESLint` and `Prettier` play nice with each other. It turns off all ESLint rules that are unnecessary or might conflict with Prettier.
- install `npm i --save-dev stylelint-config-prettier`: if you use `Stylelint`, it turns off all ESLint rules that are unnecessary or might conflict with Prettier.
- Set up your editor: install `Prettier - Code formatter` Plugin for VSCode or another extension for your IDE

### Husky

> Official Documentation: <https://typicode.github.io/husky/#/>

- run scripts prior to a commit
- initialize automatically in a project: `npx husky-init && npm install`
- define pre-commit scripts:
  - either in Terminal with: `npx husky set .husky/pre-commit "npm run lint && npm run test"` - e.g. script lint and test, defined in `package.json`, is running before a commit
  - or manually in folder `.husky` in file `pre-commit`

## TODO open: for a good React setup

- `styled-components`:
  - Official Documentation: <https://styled-components.com/>
- DevOps: deployment of code with `continuous integration`
