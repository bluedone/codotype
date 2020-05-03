const path = require("path");

module.exports = {
    stories: ["../src/**/*.stories.tsx"],
    // addons: [
    //     // "@storybook/addon-actions/register",
    //     // "@storybook/addon-viewport/register",
    // ],
    webpack: async config => {
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            use: [
                {
                    loader: require.resolve("ts-loader"),
                },
                // Optional
                {
                    loader: require.resolve("react-docgen-typescript-loader"),
                },
            ],
        });

        config.module.rules.push({
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
        });

        config.entry = {
            ...config.entry,
            src: path.join(__dirname, "../src/index.ts"),
        };

        config.resolve = {
            ...config.resolve,
            extensions: [".ts", ".tsx", ".js"],
            alias: {
                "@src": path.resolve(__dirname, "../src/"),
            },
        };

        return config;
    },
};
