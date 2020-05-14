module.exports = exports = {
  testURL: "http://localhost/",
  collectCoverageFrom: [
    "**/src/**/*.js",
    "!**/src/setupTests.js",
    "!**/__tests__/**",
    "!**/node_modules/**"
  ],
  coverageReporters: ["text", "html"],
  moduleFileExtensions: ["js", "json", "jsx", "node"],
  testPathIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "^store$": require.resolve("./src/store"),
    "^store/actions$": require.resolve("./src/store/actions"),
    "^store/actions(.+)": require.resolve("./src/store/actions/$1"),
    "^store/selectors": require.resolve("./src/store/selectors"),
    "^store/selectors(.+)": require.resolve("./src/store/selectors/$1"),
    "\\.(css|scss)$": require.resolve("./test/style-mock"),
    "\\.(gif|jpg|png|svg)$": require.resolve("./test/file-mock.js")
  },
  setupFilesAfterEnv: ["./test/setup-test-framework"],
  verbose: true
};
