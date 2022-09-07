module.exports = {
  plugins: ["unused-imports", "@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  extends: ["react-app", "next/core-web-vitals"],
  ignorePatterns: ["package.json", ".husky", "package-lock.json"],
  rules: {
    "@next/next/no-sync-scripts": "off",
    "sort-imports": 1,
    semi: ["error", "never"],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
      },
      rules: {
        "@typescript-eslint/no-empty-interface": [
          "error",
          { allowSingleExtends: true },
        ],
      },
    },
  ],
}
