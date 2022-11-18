module.exports = {
  setupFiles: [`<rootDir>/tests/loadershim.ts`],
  transform: {
    "^.+\\.jsx?$": `<rootDir>/tests/jest-preprocess.ts`,
  },
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "^(?!.*\\.module\\.css$).*\\.css$": "<rootDir>/__mocks__/styleMock.js",
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
  },
  testPathIgnorePatterns: [
    `node_modules`,
    `\\.cache`,
    `<rootDir>.*/public`,
    `cypress/e2e`,
    `ic-ui-kit`,
  ],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
};
