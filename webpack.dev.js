//reference: https://webpack.js.org/guides/hmr-react/

const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',

    context: path.resolve(__dirname, 'src'),

    entry: [
        'babel-polyfill',
        'react-hot-loader/patch', //activate hot-module-replacement for React
        'webpack-dev-server/client?http://0.0.0.0:8080',
        'webpack/hot/only-dev-server',
        './index.jsx'
    ],

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/js'),
        pathinfo: true,
        publicPath: '/dist/js/',
        sourceMapFilename: '[name].map'
    },

    devtool: 'eval-source-map',

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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.IgnorePlugin(/vertx/)
    ],

    devServer: {
        host: "0.0.0.0",
        hot: true,
        compress: false,
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/js/',
        historyApiFallback: true,

        proxy: {
            "/api": "http://0.0.0.0:5000"
        }
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    }
    
}