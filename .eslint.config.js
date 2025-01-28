export default [
  {
    ignores: ['.next/**/*', 'node_modules/**/*'],
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^__turbopack_|^global$|^__dirname$',
        },
      ],
    },
  },
];
