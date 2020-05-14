module.exports = {
  testURL: "http://localhost/",
  collectCoverageFrom: [
    "**/src/**/*.js",
    "!**/__tests__/**",
    "!**/node_modules/**"
  ],
  coverageReporters: ["text", "html"],
  moduleFileExtensions: ["js", "json", "jsx", "node"],
  testPathIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "\\.(css|scss)$": require.resolve("./test/style-mock"),
    "\\.(gif|jpg|png|svg)$": require.resolve("./test/file-mock.js")
  },
  setupTestFrameworkScriptFile: require.resolve("./test/setup-test-framework"),
  verbose: true
};
