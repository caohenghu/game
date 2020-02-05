module.exports = {
    'src/**/*.{vue,js,html}': ['eslint --fix', 'git add'],
    'src/**/*.{vue,scss,html}': ['stylelint --fix', 'git add']
}
