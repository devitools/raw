/**
 * @typedef {ClientOptions}
 */
export type ClientOptions = {
  criteria?(status: number): boolean
}

/**
 * @typedef {RequestOptions}
 */
export type RequestOptions = {
  params?: Record<string, unknown>
  data?: Document | BodyInit | null
}

/**
 * @typedef {ResponseContent}
 */
export type ResponseContent = {
  status: number
  data: string | number | Record<string, unknown>
}
