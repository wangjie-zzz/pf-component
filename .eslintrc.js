module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/typescript/recommended", "@vue/prettier", "@vue/prettier/@typescript-eslint"],
  parserOptions: {
    ecmaVersion: 2020,
    parser: "@typescript-eslint/parser"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-use-before-define": ["warn", { "functions": true, "classes": true }],
    "prettier/prettier": [
      "error",
      {
        printWidth: 200
      }
    ]
  }
};
