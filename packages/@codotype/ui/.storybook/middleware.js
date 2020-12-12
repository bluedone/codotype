const { createProxyMiddleware } = require("http-proxy-middleware");

// Adds Storybook server middleware to proxy requests to /api to http://localhost:3030
// The `http://localhost:3030` target is where local plugins are served when using @codotype/cli
module.exports = function expressMiddleware(router) {
    router.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:3030",
            changeOrigin: true,
        }),
    );
};
