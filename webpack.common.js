const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MyFirstWebpackPlugin = require('./MyFirstWebpackPlugin');
//const OfflinePlugin = require('offline-plugin');


module.exports = {
    // resolveLoader: { example of writing your own rsolver
    //     alias: {
    //         'my-first-loader': require.resolve('./my-first-loader.js')
    //     }
    // },
    output: {
        path: path.join(__dirname, 'dist'), //__dirname is a node global var that gives access to folders
        filename: '[name].chunk.js'
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin(),
        new MyFirstWebpackPlugin()
        // new OfflinePlugin({ //don't use it with GenerateSW
        //     safeToUseOptionalCaches: true,
        //
        //     caches: {
        //         main: [
        //             'index.js'
        //         ],
        //         additional: [
        //             '*.woff',
        //             '*.woff2'
        //         ],
        //         optional: [
        //             ':rest:'
        //         ]
        //     },
        //
        //     ServiceWorker: {
        //         events: true
        //     },
        //     AppCache: {
        //         events: true
        //     }
        // })
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
                }
            },
            {
                test: /\.txt$/,
                use: {
                    loader: 'my-first-loader'
                }
            },

            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'babel-loader'
            //     },
            //     exclude: [/node_modules/]
            //
            // },
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: "eslint-loader",
            //     options: {
            //         options: {
            //             failOnError: true
            //         },
            //         // default value
            //         formatter: require("eslint/lib/formatters/stylish")
            //     }
            // }
        ]
    }

};