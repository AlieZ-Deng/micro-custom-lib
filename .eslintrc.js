module.exports = {
  extends: ["alloy", "alloy/typescript"],
  env: {
    node: true,
    jest: true,
  },
  globals: {},
  rules: {
    "@typescript-eslint/no-require-imports": 0,
  },
};
