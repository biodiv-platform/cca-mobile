module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "simple-import-sort"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true }],
    "no-case-declarations": "off",
    "no-console": ["error", { allow: ["warn", "error", "debug"] }],
    "no-useless-escape": "off",
    "react/display-name": "off",
    "react/jsx-key": "off",
    "react/no-children-prop": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "simple-import-sort/exports": "off",
    "simple-import-sort/imports": "off",
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
