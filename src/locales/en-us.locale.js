const app = require('src/locales/en-us/app')
const pages = require('src/locales/en-us/pages')
const domains = require('src/locales/en-us/domains')

module.exports = {
  app,
  pages,
  domains: domains()
}
