module.exports = {
  "env": {
    "browser": true,
    "jest": true
  },
  "rules": {
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
  },
};
