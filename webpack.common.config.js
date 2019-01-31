var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app/index.jsx'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    plugins: [
        // clean out the dist foler each build
        new CleanWebpackPlugin(['dist']),
        // creates a template html file to and put into the dist folder
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
        })
    ],
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', "stage-2"],
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    { loader: 'postcss-loader' }
                ]
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: 'content/imgs/[hash]-[name].[ext]'
                    }
                }]
            }
        ]
    }
};