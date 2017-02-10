module.exports = {
    'env': {
        'node': true
    },
    'extends': 'eslint:recommended',
    'rules': {
        'indent': ['error','tab', { "MemberExpression": 1 }],
        'linebreak-style': ['error','unix'],
        'quotes': ['error','single'],
        'semi': ['error','always'],
        'no-console': 0
    }
};