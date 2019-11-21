const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
    mode: 'production',

    optimization: {
        minimize: false,
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks: {
            chunks: 'all',
            name: true,
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'common',
                    chunks: 'initial',
                    enforce: true,
                    priority: 2,
                },
                action: {
                    name: 'action',
                    chunks: 'initial',
                    priority: 1,
                    minChunks: 2,
                },
            },
        },
    },
});

