module.exports = {
    'env': {
        'node': true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    'extends': 'eslint:recommended',
    'rules': {
        'linebreak-style': ['error','unix'],
        'quotes': ['error','single'],
        'semi': ['error','always'],
        'no-console': 0
    }
};