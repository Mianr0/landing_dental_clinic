// ESLint v9 flat config for HTML files
import htmlPlugin from "@html-eslint/eslint-plugin";
import htmlParser from "@html-eslint/parser";

export default [
  // Replaces .eslintignore
  {
    ignores: ["node_modules", "public/assets/tailwind.css", "public/**/*.min.css"],
  },

  // HTML linting: enforce 2-space indentation
  {
    files: ["public/**/*.html"],
    languageOptions: { parser: htmlParser },
    plugins: { "@html-eslint": htmlPlugin },
    rules: {
      // Enforce 2 spaces
      "@html-eslint/indent": ["error", 2],
      // (Optional) some sensible extras
      "@html-eslint/no-multiple-empty-lines": ["warn", { max: 1 }],
      "@html-eslint/quotes": ["warn", "double"], // keep attributes consistent
    },
  },
];
