module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  extends: ['turbo', 'plugin:@next/next/recommended',  "plugin:prettier/recommended"],
  plugins: [
    'turbo',
    '@typescript-eslint',
    'react',
    'jsx-a11y',
    'simple-import-sort',
  ],
  env: {
    browser: true,
    node: true,
  },
  root: true,
  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/*/'],
    },
  },
  ignorePatterns: ['.next', 'node_modules', '**/*.js', '**.*.cjs'],
  rules: {
    "prettier/prettier": "warn",
    'react/jsx-pascal-case': 'off',
    'react/function-component-definition': 'off',
    'react/prop-types': 'off',
    'no-multi-assign': 'off',
    'react/destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
    'jsx-a11y/anchor-is-valid': 'off', // Next.js use his own internal link system
    'react/require-default-props': 'off', // Allow non-defined react props as undefined
    'react/jsx-props-no-spreading': 'off', // _app.tsx uses spread operator and also, react-hook-form
    'react-hooks/exhaustive-deps': 'off', // Incorrectly report needed dependency with Next.js router
    'import/prefer-default-export': 'off', // Named export is easier to refactor automatically
    'simple-import-sort/imports': 'warn', // Import configuration for `eslint-plugin-simple-import-sort`
    'simple-import-sort/exports': 'warn', // Export configuration for `eslint-plugin-simple-import-sort`
    'no-unused-imports': 'off',
    'no-unused-vars': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'react/no-unknown-property': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    '@next/next/no-img-element': 'off', // We currently not using next/image because it isn't supported with SSG mode
    '@typescript-eslint/comma-dangle': 'off', // Avoid conflict rule between Eslint and Prettier
    '@typescript-eslint/consistent-type-imports': 'error', // Ensure `import type` is used when it's necessary
  },
};
