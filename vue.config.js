const path = require('path')

module.exports = {
  runtimeCompiler: true,

  configureWebpack: {
    resolve: {
      alias: {
        '@devitools': path.resolve(__dirname, './@devitools'),
        'src': path.resolve(__dirname, './src'),
        'resources': path.resolve(__dirname, './resources'),
        'source': path.resolve(__dirname, './source'),
        'routes': path.resolve(__dirname, './routes'),
      },
      extensions: ['.js', '.ts', '.vue', '.json']
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'en-us',
      fallbackLocale: 'pt-br',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
