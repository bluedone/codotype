module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "__tests__/templates",
    "stories.tsx"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
};
