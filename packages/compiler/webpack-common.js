const path = require('path')

module.exports = function (dirname) {
    return [{
        test: /\.tmx$/i,
        use: [{
            loader: require.resolve('file-loader'),
            options: {
                outputPath: 'assets',
                publicPath(url) {
                    return url.replace('assets/', '')
                },
                name: '[contenthash].[name].[ext]',
                esModule: false
            }
        }]
    }, {
        test: /\.world$/i,
        use: [{
            loader: path.resolve(__dirname, 'tmx-loader', 'world-loader.js')
        }]
    }]
}