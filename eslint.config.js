import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: eslintReact,
      'react-hooks': eslintReactHooks,
      'react-refresh': eslintReactRefresh,
      prettier: prettierPlugin,
      import: importPlugin,
      'simple-import-sort': simpleImportSort
    }
  },
  {
    ignores: [
      'build',
      'node_modules',
      'coverage',
      'eslint.config.js',
      'vitest.config.ts',
      'vite.config.ts'
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020
      },
      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.node.json']
      }
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      'prefer-const': 'error',
      'react/jsx-curly-brace-presence': [
        'warn',
        { props: 'never', children: 'never' }
      ],
      'react/function-component-definition': [
        'warn',
        { namedComponents: 'arrow-function' }
      ],
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/explicit-function-return-type': 0,
      '@typescript-eslint/no-object-literal-type-assertion': 0,
      '@typescript-eslint/no-empty-interface': 0,
      '@typescript-eslint/no-inferrable-types': 0,
      '@typescript-eslint/no-empty-function': 1,
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/interface-name-prefix': 0,
      '@typescript-eslint/camelcase': 'off',
      'no-unused-vars': 'off',
      'no-console': [
        'error',
        {
          allow: ['warn', 'error']
        }
      ],
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': ['warn'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          argsIgnorePattern: '_'
        }
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Packages `react` related packages come first.
            ['^react', '^@?\\w'],
            // Internal packages.
            ['^(@|components)(/.*|$)'],

            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Side effect imports.
            ['^\\u0000'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.?(css|scss)$']
          ]
        }
      ]
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json'
        }
      }
    }
  }
);
