const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
//const {GenerateSW} = require('workbox-webpack-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    plugins: [
        new MiniCssExtractPlugin(), //only available in webpack 4. really good for prod
        // new webpack.optimize.AggressiveSplittingPlugin({
        //     minSize: 1000,
        //     maxSize: 6000
        // })
        //new GenerateSW() //need https to work
       // new WebpackBundleAnalyzer()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    }/*,
    performance: {
        hints: 'error'
        //maxEntrypointSize: 10
        //,assetFilter: (fileName) => fileName.endsWith('.js') || fileName.endsWith('.css') || fileName.endsWith('.png')
    }*/
};