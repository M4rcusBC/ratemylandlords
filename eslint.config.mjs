export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      ".wrangler/**",
      "app/**",
      "components/**",
      "lib/**",
      "prisma/**",
      "stack.tsx",
    ],
  },
  {
    files: ["src/**/*.{ts,tsx}", "functions/**/*.{ts,tsx}", "db/**/*.{ts,tsx}"],
    rules: {
      "no-unused-vars": "off",
    },
  },
];
