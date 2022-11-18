module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:mdx/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "testing-library", "@typescript-eslint"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".mdx"],
      },
    },
  },
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
        mdx: "never",
      },
    ],
    "react/prop-types": "off",
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/no-unknown-property": "off",
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
    "no-use-before-define": "off",
    "no-underscore-dangle": "off",
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".mdx", ".tsx"] },
    ],
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        labelComponents: ["label"],
        labelAttributes: ["htmlFor"],
        controlComponents: ["Autocomplete"],
        depth: 3,
      },
    ],
  },
  overrides: [
    {
      files: ["*.mdx"],
      rules: {
        "react/no-unescaped-entities": "off",
        "react/jsx-no-undef": "off",
        "import/prefer-default-export": "off",
      },
    },
    {
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
    },
  ],
};
