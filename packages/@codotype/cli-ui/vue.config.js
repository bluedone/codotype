const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');

// Injects the generator meta.json data structure for optimal pre-rendering conditions
let outputDir = path.resolve(process.argv[4], 'dist')
let generatorMetaPath = path.resolve(process.argv[4], 'meta.json')
let generatorMeta = require(generatorMetaPath)
process.env.VUE_APP_GENERATOR_META = JSON.stringify(generatorMeta)

module.exports = {
  chainWebpack: config => config.resolve.symlinks(false),
  outputDir: outputDir,
  runtimeCompiler: true,
  devServer: {
    proxy: {
      '/api/': { target: `http://localhost:${process.env.PORT || '9090'}` },
    }
  },
  configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        // staticDir: path.join(__dirname, 'dist'),
        staticDir: outputDir,
        routes: [
          '/',
          '/about',
          '/build'
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.html$/i,
          use: 'raw-loader',
        },
      ],
    }
  }
}

