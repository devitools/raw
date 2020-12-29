const path = require('path')

module.exports = {
  runtimeCompiler: true,

  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        'src': path.resolve(__dirname, './src')
      },
      extensions: ['.js', '.vue', '.json']
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'pt-br',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
