import { ClientOptions, RequestOptions, ResponseContent } from './Types'

/**
 * @class {Client}
 */
export default class Client {
  /**
   * @private
   */
  private options: ClientOptions

  /**
   * @param {ClientOptions} options
   */
  constructor (options: ClientOptions) {
    const standard = {
      criteria: (status: number) => status >= 200 && status < 300
    }

    this.options = { ...standard, ...options }
  }

  /**
   * @param {string} method
   * @param {string} url
   * @param {RequestOptions} options
   */
  request (method: string, url: string, options: RequestOptions): Promise<ResponseContent> {
    if (typeof XMLHttpRequest !== void 0) {
      return this.requestAsXMLHttpRequest(method, url, options)
    }
    if (typeof fetch !== void 0) {
      return this.requestAsFetch(method, url, options)
    }
  }

  /**
   * @param {string} method
   * @param {string} url
   * @param {RequestOptions} options
   * @private
   */
  private requestAsXMLHttpRequest (method: string, url: string, options: RequestOptions): Promise<ResponseContent> {
    return new Promise((resolve, reject) => {
      const criteria = (status: number): boolean => this.options.criteria(status)

      const xmlHttp = new XMLHttpRequest()
      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState !== 4) {
          return
        }
        const status = Number(xmlHttp.status)
        if (criteria(status)) {
          resolve({ status, data: xmlHttp.responseText })
          return
        }
        reject(xmlHttp.responseText)
      }
      xmlHttp.open(method, url, true)
      const { data } = options
      const body = this.parseBody(data)
      xmlHttp.send(body)
    })
  }

  /**
   * @param method
   * @param url
   * @param options
   * @private
   */
  private requestAsFetch (method: string, url: string, options: RequestOptions): Promise<ResponseContent> {
    return new Promise((resolve, reject) => {
      const criteria = (status: number): boolean => this.options.criteria(status)

      const status = (response) => {
        const status = Number(response.status)
        if (criteria(status)) {
          return Promise.resolve(response)
        }
        return Promise.reject(response.statusText)
      }

      const content = (response) => {
        return response.json()
      }

      const { data } = options
      const init = {
        method,
        // credentials: 'include',
        // headers: {
        //   'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        // },
        // body: 'foo=bar&lorem=ipsum'
        body: this.parseBody(data)
      }
      fetch(url, init)
        .then(status)
        .then(content)
        .catch((error) => reject(error))
    })
  }

  /**
   * @param {*} data
   * @private
   */
  private parseBody (data: unknown): Blob | BufferSource | FormData | URLSearchParams | ReadableStream<Uint8Array> | string {
    // Document | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | ReadableStream<Uint8Array> | string
    return ''
  }
}
