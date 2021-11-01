module.exports = {
  extends: ["react-app", "prettier", "prettier/react"],
  plugins: ["react", "prettier", "react-hooks"],
  parser: "babel-eslint",
  rules: {
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", "jsx"],
      },
    ],
    "prettier/prettier": "error",
    "max-len": ["error", 100],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "consistent-return": "off",
  },
  env: {
    browser: true,
  },
  globals: {
    window: true,
    gtag: true,
    cy: true,
  },
};
