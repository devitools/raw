const app = require('resources/locales/en-us/app')
const pages = require('resources/locales/en-us/pages')
const domains = require('resources/locales/en-us/domains')

module.exports = {
  app,
  pages,
  domains: domains()
}
