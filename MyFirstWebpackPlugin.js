class MyFirstWebpackPlugin {
    apply(compiler) {

        compiler.hooks.beforeRun.tapAsync('MyFirstWebpackPlugin', (compilation, cb) => {
            console.log(compilation.assets);
            //console.log(compiler.hooks);
            cb();
            debugger;

        });
    }
}

module.exports = MyFirstWebpackPlugin;