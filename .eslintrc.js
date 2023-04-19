module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier', 'standard-with-typescript'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/indent': ['error', 2, {
      'ignoredNodes': [
        'PropertyDefinition[decorators]',
        'FunctionExpression[params]:has(Identifier[decorators])'
      ]
    }],
    "@typescript-eslint/comma-dangle": ['off'],
    '@typescript-eslint/strict-boolean-expressions': ['off'],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/space-before-function-paren': ['off']
  },
}
