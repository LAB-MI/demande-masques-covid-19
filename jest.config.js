// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

// eslint-disable-next-line no-undef
module.exports = {
  moduleFileExtensions: ["js", "json"],
  setupFiles: ["<rootDir>/tests/unit/jest-setup"],
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/src/**/*.spec.js"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
};
