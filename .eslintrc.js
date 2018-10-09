const prettier = require('./.prettierrc.js')

module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    rules: {
        'prettier/prettier': ['error', prettier],
    },
}
