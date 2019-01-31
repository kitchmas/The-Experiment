const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    // tells the package.json script to serve the files from the dist folder
    devServer: {
        contentBase: './dist'
    },
});