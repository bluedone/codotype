const path = require('path');

// Injects the generator codotype-generator.json data structure for optimal pre-rendering conditions
let outputDir = path.resolve(process.argv[4], 'dist')
let generatorMetaPath = path.resolve(process.argv[4], 'codotype-generator.json')
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

