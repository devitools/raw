/**
 * @param {Record<string,unknown>} record
 * @return {Promise<unknown>}
 */
export function save (record) {
  return new Promise((resolve) => {
    const handler = () => {
      resolve(record)
    }
    window.setTimeout(handler, 500)
  })
}
