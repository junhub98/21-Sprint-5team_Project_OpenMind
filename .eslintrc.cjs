module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Vite + React 필수
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.jsx'] }],
    'import/extensions': 'off',

    // 현실 팀플 세팅
    'react/prop-types': 'off',
    'no-console': 'off',
    'import/prefer-default-export': 'off',
  },
};
