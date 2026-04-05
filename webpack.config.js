const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

let production = process.env.NODE_ENV === "production";

let config = {
    mode: "development",
    entry: "./src/root.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    devServer: {
        port: 8084,
        static: [
            { directory: "./dist" },
            { directory: "./src", publicPath: "/" }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /(\.tsx$|\.ts$)/,
                exclude: /node_modules/,
                use: "ts-loader"
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/, /src\/js/],
                use: "ts-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: "asset/resource"
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "./src/images", to: "images" },
                { from: "./src/bootstrap", to: "bootstrap" },
                { from: "./src/js/main.js", to: "js/main.js" },
                { from: "./src/js/maps", to: "js/maps" },
                { from: "./src/js/entities", to: "js/entities" },
                { from: "./src/js/systems", to: "js/systems" },
                { from: "./src/js/collectables", to: "js/collectables" }
            ]
        }),
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html"
        })
    ]
}

if (production) {
    config.mode = "production";
    config.plugins = [
        new CopyPlugin({
            patterns: [
                { from: "./src/images", to: "images" },
                { from: "./src/bootstrap", to: "bootstrap" }
            ]
        }),
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html"
        })
    ];
}

module.exports = config;