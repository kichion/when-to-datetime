const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { readFileSync } = require("fs");
const { parse } = require("jsonc-parser");
// extendsを自動的に解決してマージできないため、compilerOptions.pathsを書いているファイルを指定する
const { compilerOptions } = parse(readFileSync("./tsconfig.json").toString());
const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: "<rootDir>/src/",
});

module.exports = {
  roots: ["<rootDir>"],
  preset: "ts-jest",
  verbose: true,
  moduleFileExtensions: ["ts", "js", "json"],
  testPathIgnorePatterns: ["<rootDir>[/\\\\](node_modules)[/\\\\]"],
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(ts)$"],
  testMatch: ["<rootDir>/**/?(*.)(spec|test).(ts|js)"],
  moduleNameMapper,
  moduleDirectories: ["node_modules", "src"],
  testEnvironmentOptions: { resources: "usable" },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json",
    },
  },
};
