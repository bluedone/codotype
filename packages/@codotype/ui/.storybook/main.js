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
        // config.module.rules.push({
        //     test: /\.(ts|tsx)$/,
        //     use: [
        //         {
        //             loader: require.resolve("ts-loader"),
        //         },
        //     ],
        // });

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
