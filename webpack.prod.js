const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, 'src'),

    entry: ['babel-polyfill','./app.jsx'],

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/js'),
        pathinfo: true,
        publicPath: '/dist/js/',
        sourceMapFilename: '[name].map'
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: require.resolve('sass-loader'),
                    },
                ]
            }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: true,
            keep_fnames: true,
            screw_ie8: true
        })
    ]
}