module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'standard-with-typescript',
    'plugin:prettier/recommended', // 追加
    'prettier',
    'prettier/flowtype', // 追加（eslint-plugin-flowtypeを無効化）
    'prettier/react' // 追加（eslint-plugin-reactを無効化）
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  ignorePatterns: ['vite.config.ts', '/src/dist/assets/index.08ff9814.js'],
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    'prettier/prettier': ['error', { "singleQuote": true }]
    // 'react/react-in-jsx-scope': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
