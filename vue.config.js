const path = require('path')

module.exports = {
  runtimeCompiler: true,

  configureWebpack: {
    resolve: {
      alias: {
        'src': path.resolve(__dirname, './src')
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
