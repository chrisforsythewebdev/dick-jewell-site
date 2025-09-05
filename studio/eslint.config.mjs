// eslint.config.mjs  (the one that currently exports [...studio])
import studio from '@sanity/eslint-config-studio'

const isCI = !!(process.env.VERCEL || process.env.CI) // optional: off only on Vercel/CI

export default [
  ...studio,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Turn off completely (or use isCI ? 'off' : 'warn' to keep a local warning)
      'react/no-unescaped-entities': 'off',
      // 'react/no-unescaped-entities': isCI ? 'off' : 'warn',
    },
  },
]
