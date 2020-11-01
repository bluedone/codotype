module.exports = {
    roots: ["<rootDir>/src"],
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)",
    ],
    testPathIgnorePatterns: [
        "/node_modules/",
        "test_state.ts",
        "/mock_plugin/",
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
};
