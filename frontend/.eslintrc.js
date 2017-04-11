// Error levels
const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
    "extends": "standard",
    rules: {
      "react/jsx-uses-vars": WARNING
    },
    "plugins": [
        "standard",
        "promise",
        "react",
        "babel"
    ],
    "env": {
      // browser global variables
      browser: true,
    }
};
