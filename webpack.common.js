const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = {

    output: {
        path: path.join(__dirname, 'dist'), //__dirname is a node global var that gives access to folders
        filename: '[name].chunk.js'
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.png$/,
                use: {
                    loader: 'url-loader',
                    options: { //when image size exceeds 10000 bytes, it'll pass it off to file-loader, but chunks the image to smaller size
                        limit: 1000
                    }
                },

            }
        ]
    }
};