var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        vendor: ["react", "react-dom", "react-router-dom"],
        app: ["babel-polyfill", "./src/index"]
    },
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/",
        filename: "assets/[name].[hash].js",
        chunkFilename: "assets/[name].[chunkhash].js"
    },
    devtool: "cheap-module-source-map",
    resolve: {
        modules: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: ['.web.js', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, "src"),
                loader: "babel-loader",
                query: {
                    presets: [
                        ["es2015", { modules: false }],
                        "stage-0",
                        "react"
                    ],
                    plugins: [
                        "transform-async-to-generator",
                        "transform-decorators-legacy"
                    ]
                }
            },
            {
                test: /\.less|css$/i,
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: [
                      'css-loader',
                      'postcss-loader?{"sourceMap":true}',
                      'resolve-url-loader',
                      'less-loader?{"sourceMap":true}'
                  ]
              })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    "url-loader?limit=10240&name=img/[hash].[ext]"
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "file-loader"
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false,
                drop_console: true,
                screw_ie8: true
            },
            output: {
                comments: false
            }
        }),
        new ExtractTextPlugin("assets/styles.css"),
        new HtmlWebpackPlugin({
            hash: false,
            template: "./index.hbs"
            /*, favicon: path.resolve(__dirname, './src/assets/favicon.ico')*/
        })
    ]
};
