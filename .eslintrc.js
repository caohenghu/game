module.exports = {
    extends: ['standard', 'plugin:vue/recommended'],
    env: {
        browser: true,
        node: true
    },
    globals: {
        Vue: true,
        Vuex: true,
        axios: true,
        AMap: true
    },
    settings: {
        'html/html-extensions': ['.html']
    },
    plugins: ['html', 'vue'],
    rules: {
        indent: [
            'error',
            4,
            {
                SwitchCase: 1
            }
        ],
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never'
            }
        ],
        'prefer-promise-reject-errors': [
            'error',
            {
                allowEmptyReject: true
            }
        ],
        'vue/html-indent': ['error', 4]
    }
}
