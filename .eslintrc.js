module.exports = {
  "plugins": ["css-modules"],
  "extends": ["airbnb", "plugin:css-modules/recommended"],
  "env": {
    "browser": true,
    "jest": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },
  "settings": {
    "import/resolver": {
      "alias": [
        ["store", "./src/store"],
        ["components", "./src/components"],
        ["pages", "./src/pages"]
      ]
    }
  },
  "rules": {
    "padded-blocks": "off",
    "linebreak-style": ["error", process.platform === "win32" ? "windows" : "unix"],
    "max-len": ["warn", 120, {"ignoreComments": true}, {"ignoreTrailingComments": true}],
    "comma-dangle": ["error", "never"],
    "react/prefer-stateless-function": "warn",
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": ["**/*.test.js", "*.config.js", "test/*"]
      }
    ],
    "import/no-cycle": "off",
    "arrow-parens": ["error", "always"],
    "curly": ["error", "all"],
    "no-use-before-define": ["error", {"functions": false}],
    "spaced-comment": "warn",
    "no-extra-semi": "warn",
    "react/prop-types": "warn",
    "implicit-arrow-linebreak": "off",
    "object-curly-newline": "off",
    "operator-linebreak": ["error", "after", {"overrides": {"?": "before", ":": "before"}}],
    "react/jsx-filename-extension": "off",
    "react/no-array-index-key": "warn",
    "react/jsx-one-expression-per-line": "off",
    "jsx-a11y/click-events-have-key-events": "warn",
    "jsx-a11y/anchor-is-valid": "warn",
    "jsx-a11y/no-autofocus": "off",
    "no-return-assign": ["error", "except-parens"],
    "no-plusplus": ["error", {"allowForLoopAfterthoughts": true}],
    "no-underscore-dangle": ["error", {"allow": ["_type"]}],
    "indent": "off",
    "react/jsx-indent": "off",
    "no-nested-ternary": "warn",
    "consistent-return": "warn",
    "max-depth": ["error", {"max": 3}],
    "max-lines-per-function": ["warn", {"max": 100}],
    "max-nested-callbacks": ["error", {"max": 3}],
    "complexity": ["error", {"max": 10}]
  }
};
