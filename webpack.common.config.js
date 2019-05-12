var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app/index.jsx'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
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
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'images[name].[ext]',
                        outputPath: 'images',
                    },
                }, ],
            },
            {
                test: /\.(mp3)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'audio[name].[ext]',
                        outputPath: 'audio',
                    },
                }, ],
            },
            {
                test: /\.(woff|woff2)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: 'content/imgs/[hash]-[name].[ext]'
                    }
                }]
            },
            {
                test: /\.ttf$/,
                use: [
                  {
                    loader: 'ttf-loader',
                    options: {
                      name: './font/[hash].[ext]',
                    },
                  },
                ]
              }
        ]
    }
};