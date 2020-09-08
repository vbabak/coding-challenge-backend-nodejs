module.exports = {
  plugins: ['jest'],
  extends: ['plugin:jest/recommended', 'plugin:jest/style'],
  env: {
    'jest/globals': true,
  },
  rules: {
    'jest/no-disabled-tests': 'error',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/consistent-test-it': 'error',
    'jest/valid-expect': [
      'error',
      {
        alwaysAwait: true,
      },
    ],
    'node/no-unpublished-import': [
      'error',
      {
        allowModules: ['supertest'],
      },
    ],
  },
}
