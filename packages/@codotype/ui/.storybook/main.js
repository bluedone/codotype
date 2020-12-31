const path = require("path");

module.exports = {
    stories: ["../src/**/*.stories.tsx"],
    addons: [
        {
            name: "@storybook/preset-typescript",
            options: {
                tsLoaderOptions: {
                    configFile: path.resolve(__dirname, "./tsconfig.json"),
                },
                forkTsCheckerWebpackPluginOptions: {
                    colors: false, // disables built-in colors in logger messages
                },
                include: [path.resolve(__dirname, "../src")],
            },
        },
    ],
    webpack: async config => {
        // Defines Storybook-specific mock for next/link
        config.resolve.alias["next/link"] = path.resolve(
            __dirname,
            "./mocked_modules/next-link.js",
        );

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

        // config.entry = {
        //     ...config.entry,
        //     src: path.join(__dirname, "../src/index.ts"),
        // };

        config.resolve = {
            ...config.resolve,
            extensions: [".ts", ".tsx", ".js"],
        };

        return config;
    },
};
