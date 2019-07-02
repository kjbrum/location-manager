// const path = require('path')
const tailwindcss = require('tailwindcss')

const purgecss = require('@fullhuman/postcss-purgecss')({
    content: [
        './pages/**/*.js', //
        './components/**/*.js', //
    ],
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
    whitelist: ['html', 'body'],
    whitelistPatterns: [],
})

module.exports = {
    plugins: [
        require('postcss-import'),
        tailwindcss('./tailwind/tailwind.config.js'),
        require('postcss-hexrgba'),
        // require('postcss-functions')({
        // 	glob: path.join(__dirname, 'css/functions', '*.js'),
        // }),
        require('postcss-nested'),
        require('postcss-flexibility'),
        require('pixrem'),
        require('autoprefixer'),
        ...(process.env.NODE_ENV === 'production'
            ? [purgecss, require('cssnano')]
            : []),
    ],
}
