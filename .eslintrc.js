module.exports = {
    // Extend Next.js recommended linting configuration
    extends: [
      'next/core-web-vitals', // Ensures adherence to the latest Next.js standards
      'plugin:@typescript-eslint/recommended', // TypeScript-specific lint rules
    ],
  
    // Ignore build and dependency folders
    ignorePatterns: ['.next/**/*', 'node_modules/**/*'],
  
    rules: {
      // Allow unused variables with specific prefixes (to avoid errors from TurboPack)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_', // Ignore arguments prefixed with "_"
          varsIgnorePattern: '^__turbopack_|^global$|^__dirname$', // Ignore specific TurboPack vars
        },
      ],
  
      // Add other useful rules for clean development
      'react/jsx-uses-react': 'off', // Not needed in latest React (since React 17+ with JSX runtime)
      'react/react-in-jsx-scope': 'off', // Not needed in latest Next.js
    },
  
    // Advanced overrides for specific files/folders
    overrides: [
      {
        files: ['.next/**/*'],
        rules: {
          // Disable all linting for generated files inside `.next/`
          '@typescript-eslint/no-unused-vars': 'off',
        },
      },
    ],
  };
  