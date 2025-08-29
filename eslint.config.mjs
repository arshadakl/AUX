import antfu from '@antfu/eslint-config';
import nextPlugin from '@next/eslint-plugin-next';
import jestDom from 'eslint-plugin-jest-dom';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react'
import playwright from 'eslint-plugin-playwright';
import testingLibrary from 'eslint-plugin-testing-library';

export default antfu(
  {
    react: true,
    lessOpinionated: true,
    isInEditor: false,
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
    },
    typescript: {
      overrides: {
        // Add your specific TypeScript ESLint rules here
        '@typescript-eslint/require-await': 'error',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            format: ['PascalCase'],
            leadingUnderscore: 'allow',
            prefix: ['is', 'has', 'should', 'can', 'did', 'will', 'show', 'are'],
            selector: 'variable',
            types: ['boolean'],
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
          {
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
              regex: '^I[A-Z]',
              match: false,
            },
          },
        ],
      },
    },
    stylistic: {
      semi: true,
      quoteType: 'single',
    },

    formatters: {
      css: true,
      html: true,
      markdown: true,
    },

    // Ignore patterns
    ignores: [
      '**/dist',
      '**/*.json',
      '**/*.yaml',
      '**/*.md',
      '**/*.css',
      '**/.prettierrc',
      'src/instrumentation.ts',
      'src/components/ui/**/*',
      'src/components/ui/extended/**/*',
      'src/hooks/use-mobile.tsx',
      'src/app/global-error.tsx',
      'src/hooks/use-toast.ts',
      'src/lib/**/*',
      'src/api',
      'migrations/**/*',
      'next-env.d.ts',
      'vitest-setup.ts',
      'vitest.config.ts',
      'sentry.client.config.ts',
      'next.config.ts',
      'sentry.edge.config.ts',
      'sentry.server.config.ts',
      'eslint.config.mjs',
    ],
  },
  /** FIXME: update this plugin when the pluggin support tailwind v4 */
  // {
  //   plugins: {
  //     tailwindcss: tailwind,
  //   },
  //   rules: {
  //     ...tailwind.configs['flat/recommended'].rules,
  //     'tailwindcss/classnames-order': 'error',
  //     'tailwindcss/enforces-negative-arbitrary-values': 'error',
  //     'tailwindcss/enforces-shorthand': 'error',
  //     'tailwindcss/migration-from-tailwind-2': 'warn',
  //     'tailwindcss/no-arbitrary-value': 'off',
  //     'tailwindcss/no-custom-classname': 'warn',
  //     'tailwindcss/no-contradicting-classname': 'error',
  //   },
  // },
  jsxA11y.flatConfigs.recommended,
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  {
    plugins: {
      '@react': reactPlugin,
    },
    rules: {
      "@react/function-component-definition": [
        "error",
        {
          "namedComponents": "function-declaration",
          "unnamedComponents": "arrow-function"
        }
      ],
    },
  },
  {
    files: [
      '**/*.test.ts?(x)',
    ],
    ...testingLibrary.configs['flat/react'],
    ...jestDom.configs['flat/recommended'],
  },
  {
    files: [
      '**/*.spec.ts',
      '**/*.e2e.ts',
    ],
    ...playwright.configs['flat/recommended'],
  },
  {
    rules: {
      // Preserve your custom rules
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
      "react-hooks/rules-of-hooks": "error",
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reduce': 'off',
      'antfu/no-top-level-await': 'off', // Allow top-level await
      'style/brace-style': ['error', '1tbs'], // Use the default brace style
      'react/prefer-destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
      'node/prefer-global/process': 'error', // Allow using `process.env`
      'test/padding-around-all': 'error', // Add padding in test files
      'test/prefer-lowercase-title': 'off', // Allow using uppercase titles in test titles

      'unicorn/prevent-abbreviations': ['error', {
        allowList: {
          e2e: true,
          Env: true,
        },
        replacements: {
          props: false,
          ref: false,
          params: false,
        },
      }],
    },
  },
  // JavaScript-specific overrides
  {
    files: ['**/*.js'],
    rules: {
      'unicorn/prefer-module': 'off',
    },
  },
);
