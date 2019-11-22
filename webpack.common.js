const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ASSET_PATH = process.env.ASSET_PATH || '../';


const getEntry = () => {
    const entry = {};
    glob.sync('./src/js/*.js').forEach((name) => {
        const start = name.indexOf('/src/js/') + 8;
        const end = name.length - 3;
        const eArr = [];
        const n = name.slice(start,end);
        eArr.push(name);
        entry[n] = eArr;
    });
    return entry;
};

const config = {
    entry: getEntry(),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './js/[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use:[
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                    ]
            },
            {
                test: /\.pug$/,
                use: [
                    {
                    loader: 'html-loader',
                        options: {
                            minimize: false // 不壓縮 HTML
                        }
                    },
                    {
                    loader: 'pug-html-loader',
                        options: {
                            pretty: true // 美化 HTML 的編排 (不壓縮HTML的一種)
                        }
                    },
                ]
            },
            
            {
                test: /\.(sc|sa|c)ss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: ASSET_PATH
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                          url: false
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                    
                ]
            },

            {
                test: /\.styl$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: ASSET_PATH
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpge|gif)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192, //bytes
                        name: '[name].[ext]?[hash:7]',
                        outputPath: 'images'
                    }
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    // name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'file-loader',
                    options: {
                        limit: 8192, //bytes
                        name: '[name].[ext]?[hash:7]',
                    }
                }
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jQuery",
            "window.jQuery": "jquery"
        }),
        new MiniCssExtractPlugin({
            filename: './css/[name].css',
            chunkFilename: "./css/[name].css"
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
        }),
    ],
    resolveLoader: {
        extensions: ['.js', '.styl'],
    },
    resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    },
    stats: {
        builtAt: false,
        children: false,
        chunks: false,
        modules: false,
        timings: false,
        version: true // webpack v
    },
    
};
Object.keys(config.entry).forEach((name) => {
    config.plugins.push(new HtmlWebpackPlugin({
        template:`./src/${name}.pug`,
        filename: `${name}.html`,
        chunks:['common','runtime','vendor','action',`${name}`],
        minify: {
            removeComments: false,
            collapseWhitespace: false, // 壓縮 HTML
            removeAttributeQuotes: false,
        },
    }));
});
module.exports = config;