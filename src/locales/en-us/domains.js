/**
 * @return {{}}
 */
module.exports = function () {
  const locales = require.context('../../domains', true, /en-us.js$/i)
  const messages = {}
  locales
    .keys()
    .forEach((key) => {
      const matched = key.match(/\.\/(.*)\/en-us.js/i)
      if (matched && matched.length > 1) {
        const locale = String(matched[1]).toLowerCase()
        messages[locale] = locales(key)
      }
    })
  return messages
}
