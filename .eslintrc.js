module.exports = {
  env: {
    browser: true,
    es6: true,
    "jest/globals": true,
    "cypress/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:cypress/recommended",
  ],
  plugins: ["jest", "cypress"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    process: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
};
