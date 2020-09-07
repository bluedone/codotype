const path = require("path");

module.exports = {
    entry: {
        src: path.join(__dirname, "src/index.ts"),
    },
    output: {
        path: path.join(__dirname, "dist/js"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.tsx?$/,
                use: "ts-loader",
            },
            {
                exclude: /node_modules/,
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader", // Creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader", // Translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader", // Compiles Sass to CSS
                    },
                ],
            },
        ],
    },
};
