module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "jasmine": true,
    "node": true,
  },
  "plugins": [
    "react",
  ],
  "rules": {
    // Allow js files to use jsx syntax, too
    'react/jsx-filename-extension': 'off',
    // Recommend not to leave any console.log in your code
    // Use console.error, console.warn and console.info instead
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],
  },
};
