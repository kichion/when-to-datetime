module.exports = {
  roots: ["<rootDir>"],
  preset: "ts-jest",
  verbose: true,
  moduleFileExtensions: ["ts", "js", "json"],
  testPathIgnorePatterns: ["<rootDir>[/\\\\](node_modules)[/\\\\]"],
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(ts)$"],
  testMatch: ["<rootDir>/**/?(*.)(spec|test).(ts|js)"],
  moduleNameMapper: { "#/(.+)": "<rootDir>/src/$1" },
  moduleDirectories: ["node_modules", "src"],
  testEnvironmentOptions: { resources: "usable" },
};
