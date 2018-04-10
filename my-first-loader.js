module.exports = function (src) {


    const callback = this.async();

    //callback(null, result, map, meta);


    const newSource = src.replace('.log', '.error');

    return callback(null, JSON.stringify(newSource));
};