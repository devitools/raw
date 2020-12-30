const app = require('src/locales/pt-br/app')
const pages = require('src/locales/pt-br/pages')
const domains = require('src/locales/pt-br/domains')

module.exports = {
  app,
  pages,
  domains: domains()
}
