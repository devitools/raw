const category = require('src/domains/Category/pt-br')
const customer = require('src/domains/Customer/pt-br')

module.exports = {
  pages: {
    home: {
      title: 'Início'
    }
  },
  domains: {
    category,
    customer
  }
}
