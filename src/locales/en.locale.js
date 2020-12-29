const category = require('src/domains/Category/en-us')
const customer = require('src/domains/Customer/en-us')

module.exports = {
  app: {
    schema: {
      actions: {
        save: {
          success: 'Success!!',
          error: 'Error!!',
          warning: 'Warning!!'
        }
      }
    }
  },
  pages: {
    home: {
      title: 'Home'
    }
  },
  domains: {
    category,
    customer
  }
}
