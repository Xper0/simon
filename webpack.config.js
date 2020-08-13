const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
require("babel-polyfill")


module.exports = {

    entry: ["babel-polyfill","./src/main.js"],
    output: {
        path: path.join(__dirname, "/dis"),
        filename: "[name].[chunkhash].js",

    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
                resolve: {
                    extensions: ['.js', '.vue', '.json'],
                    alias: {
                        'vue$': 'vue/dist/vue.esm.js',
                    }
                }
            },

            {
                test: /\.css$/,
                use: [miniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(jpg|svg)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "images",
                        publicPath: "images"
                    }
                }]
            }
        ]
    },
    /*
    devServer: {
        contentBase: "./dis",
        open: true,
        port: 3000
    },*/
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new miniCssExtractPlugin({
            filename: '[name].css'
        }),
        new CleanWebpackPlugin(),




    ]
};

