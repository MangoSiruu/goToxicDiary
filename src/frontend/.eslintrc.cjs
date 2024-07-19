module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: ['airbnb/hooks', 'airbnb', 'plugin:prettier/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'prettier'],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', '/src']],
        extensions: ['.js', '.jsx'],
      },
    },
  },
  rules: {
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-no-target-blank': 'off',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'import/extensions': ['off'],
    'import/no-extraneous-dependencies': ['off'],
    'import/no-named-as-default': 0,
    '@typescript-eslint/no-use-before-define': ['off'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
