var path = require('path');
module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src') + '/app/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist') + '/app',
        filename: 'bundle.js',
        publicPath: '/app/'
    },
    devtool: "#eval-source-map",
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