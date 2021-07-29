module.exports = {
  "*.{ts,tsx,html,scss}": "prettier --write",
  "**/*.ts?(x)|**/*.js?(x)": "eslint --fix",
  '**/*.ts?(x)': () => 'tsc --project tsconfig.json --noEmit',
};
