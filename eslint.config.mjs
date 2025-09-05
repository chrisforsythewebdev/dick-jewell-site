// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Optional: turn the rule off only on CI/Vercel, warn locally
const isCI = !!(process.env.VERCEL || process.env.CI);

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // Hard off everywhere:
      // "react/no-unescaped-entities": "off",

      // OR: off on CI, warn locally (nice middle ground):
      "react/no-unescaped-entities": isCI ? "off" : "warn",
    },
  },
];

export default eslintConfig;
