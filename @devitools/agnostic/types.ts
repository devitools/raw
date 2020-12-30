/**
 * @typedef {Field}
 */
export type Field = {
  form: {
    is: any
    attrs: {
      name: string
      width: string | number
      height: string | number
      label: string
      order: string | number
      placeholder: string
      value: unknown
    }
    listeners: Record<string, Function>
  }
  table: {}
}

/**
 * @typedef {Action}
 */
export type Action = {
  color: string
  attrs: {
    label: string,
    disabled: boolean
  }
  listeners: Record<string, Function>
}

/**
 * @typedef {Service}
 */
export interface Service {
  create (record: Record<string, any>): Promise<any>
  read (id: string | number): Promise<any>
  update (record: Record<string, any>): Promise<any>
  destroy (record: Record<string, any> | string | number): Promise<any>
  search (): Promise<any>
  instance(): Service
}

/**
 * @typedef {ContainerComponent}
 */
export interface ContainerComponent {
  $loading: {
    show(): void
    hide(): void
  }
  $notification: {
    success(message: string): void
    error(message: string): void
  },
  $t(path: string): string

  $record (): Record<string, any>
}
