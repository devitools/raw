/**
 * @return {{}}
 */
module.exports = function () {
  const locales = require.context('../../../source/domains', true, /pt-br.js$/i)
  const messages = {}
  locales
    .keys()
    .forEach((key) => {
      const matched = key.match(/\.\/(.*)\/pt-br.js/i)
      if (matched && matched.length > 1) {
        const locale = String(matched[1]).toLowerCase()
        messages[locale] = locales(key)
      }
    })
  return messages
}
