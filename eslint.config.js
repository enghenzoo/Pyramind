import js from '@eslint/js'; // ESLint core JS config
import globals from 'globals'; // Browser and Node global variables
import reactHooks from 'eslint-plugin-react-hooks'; // Enforce rules for React hooks
import reactRefresh from 'eslint-plugin-react-refresh'; // Vite + React refresh plugin
import { defineConfig, globalIgnores } from 'eslint/config'; // Define ESLint config with global ignores

export default defineConfig([
  // Ignore all files in the "dist" directory
  globalIgnores(['dist']),
  {
    // Apply these rules to all JS and JSX files
    files: ['**/*.{js,jsx}'],

    // Extend recommended ESLint rules and plugins
    extends: [
      js.configs.recommended, // Recommended core JS rules
      reactHooks.configs['recommended-latest'], // Recommended React hooks rules
      reactRefresh.configs.vite, // Plugin for React Refresh in Vite
    ],

    // Language options and parser settings
    languageOptions: {
      ecmaVersion: 2020, // ECMAScript version
      globals: globals.browser, // Include browser global variables
      parserOptions: {
        ecmaVersion: 'latest', // Use latest ECMAScript syntax
        ecmaFeatures: { jsx: true }, // Enable JSX parsing
        sourceType: 'module', // Support ES modules
      },
    },

    // Custom ESLint rules
    rules: {
      // Error on unused variables, but ignore variables starting with uppercase letters or underscore
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
]);
