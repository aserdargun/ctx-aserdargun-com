import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'playwright-report', 'test-results'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{mjs,cjs}', 'scripts/**/*.{ts,js,mjs}', 'tests/**/*.{ts,js,mjs}', 'vite.config.ts', 'playwright.config.ts'],
    languageOptions: { globals: { console: 'readonly', process: 'readonly', setTimeout: 'readonly', clearTimeout: 'readonly', URL: 'readonly', Buffer: 'readonly' } },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: { ecmaVersion: 2022 },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
)
