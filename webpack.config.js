
const commonConfig = require('./webpack.common');
const webpackMerge = require('webpack-merge');


module.exports = (env) => {
    //Object.assign({mode: env.mode}, commonConfig);
    const {mode} = env;
    const envConfig = require(`./webpack.${mode}`);
    return webpackMerge({mode}, commonConfig, envConfig);
};