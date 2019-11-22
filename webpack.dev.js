const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
function port(minNum, maxNum) {
	return Math.floor( Math.random() * (maxNum - minNum + 1) ) + minNum;
}
module.exports = webpackMerge(commonConfig, {
    mode: 'development',
    devServer: {
        port: port(8000,9000),
        open:true,  
        hot: true,
    },
});