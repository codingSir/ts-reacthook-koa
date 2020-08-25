module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-nested'),
        require('cssnano')({ //is a modular CSS minifier.
            preset: "advanced",
            autoprefixer: false,
            "postcss-zindex": false
        }),
        require('postcss-styled')
    ]
}