module.exports = {
    devtool: 'source-map', //get the full options here: https://webpack.js.org/configuration/devtool/
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    }
};