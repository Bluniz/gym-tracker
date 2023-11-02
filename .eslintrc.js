module.exports = {
    'env': {
        'es2021': true,
        'es2022': true,
        'node': true,
        'jest': true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
        'project': './tsconfig.json',
    },
    'plugins': ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
    'rules': {
        'indent': ['error', 2, { SwitchCase: 1 }],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': ['error', 'single', { avoidEscape: true }],
        'semi': [
            'error',
            'always'
        ],
        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'react/display-name': 'off',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        'no-unsafe-optional-chaining': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        "linebreak-style": 'off',
        "@typescript-eslint/no-floating-promises": 'off'
    },
     'settings': {
     'react': {
      'version': 'detect',
    },
  },
};
