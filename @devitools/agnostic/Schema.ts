import { Action, ContainerComponent, Field, Service } from './types'
import capture from './error'

/**
 * @class {Schema}
 */
export default class Schema {
  /**
   * @type {string}
   */
  domain: string = ''

  /**
   * @type {Record<string,Field>}
   * @private
   */
  private readonly fields: Record<string, Field>

  /**
   * @type {Record<string,Action>}
   * @private
   */
  private readonly actions: Record<string, Action>

  /**
   * @type {string}
   * @private
   */
  private __currentField: string

  /**
   * @type {string}
   * @private
   */
  private __currentAction: string

  /**
   * @type {Service}
   * @protected
   */
  protected service: Service | undefined

  /**
   */
  constructor () {
    this.fields = {}
    this.actions = {}

    this.__currentField = ''
    this.__currentAction = ''

    this.defaults()

    this.construct()
  }

  /**
   * @return {Schema}
   */
  static build () {
    return new this()
  }

  /**
   */
  construct () {
    throw new Error('override construct is required')
  }

  /**
   * @return {Service}
   */
  $service(): Service {
    if (!this.service) {
      throw new Error('service is not defined')
    }
    return this.service.instance()
  }

  /**
   */
  defaults () {
    const schema = this
    this.addAction('create')
      .actionOn('click', async function (this: ContainerComponent) {
        this.$loading.show()
        try {
          await schema.$service().create(this.$record())
          this.$notification.success(this.$t('app.schema.actions.create.success'))
        } catch (e) {
          capture(e)
          this.$notification.error(this.$t('app.schema.actions.create.error'))
        }
        this.$loading.hide()
      })
  }

  /**
   * @param {string} name
   * @return {Schema}
   */
  addField (name: string): Schema {
    this.__currentField = name
    this.fields[name] = {
      form: {
        is: 'input',
        attrs: {
          name: name,
          width: '100',
          height: '1',
          label: '',
          order: 1,
          placeholder: '',
          value: undefined
        },
        listeners: {}
      },
      table: {}
    }
    return this
  }

  /**
   * @param {string} name
   * @return {Schema}
   */
  getField (name: string): Schema {
    this.__currentField = name
    return this
  }

  /**
   * @param {any} is
   * @return {Schema}
   */
  fieldIs (is: any): Schema {
    this.fields[this.__currentField].form.is = is
    return this
  }

  /**
   * @return {Schema}
   */
  fieldIsInput (): Schema {
    return this.fieldIs('input')
  }

  /**
   * @return {Schema}
   */
  fieldIsTextarea (): Schema {
    return this.fieldIs('textarea')
  }

  /**
   * @return {Schema}
   */
  fieldIsSelect (): Schema {
    return this.fieldIs('select')
  }

  /**
   * @param {string} attr
   * @param {any} value
   * @return {Schema}
   */
  fieldFormSet (attr: string, value: any): Schema {
    // @ts-ignore
    this.fields[this.__currentField].form.attrs[attr] = value
    return this
  }

  /**
   * @param {string} label
   * @return {Schema}
   */
  fieldFormLabel (label: string): Schema {
    return this.fieldFormSet('label', label)
  }

  /**
   * @param {string | number} width
   * @return {Schema}
   */
  fieldFormWidth (width: string | number): Schema {
    return this.fieldFormSet('width', width)
  }

  /**
   * @param {string | number} height
   * @return {Schema}
   */
  fieldFormHeight (height: string | number): Schema {
    return this.fieldFormSet('height', height)
  }

  /**
   * @param {string | number} order
   * @return {Schema}
   */
  fieldFormOrder (order: string | number): Schema {
    return this.fieldFormSet('order', order)
  }

  /**
   * @param {string} placeholder
   * @return {Schema}
   */
  fieldFormPlaceholder (placeholder: string): Schema {
    return this.fieldFormSet('placeholder', placeholder)
  }

  /**
   * @param {string} event
   * @param {function(*): void} handler
   * @return {Schema}
   */
  fieldFormOn (event: string, handler: Function): Schema {
    this.fields[this.__currentField].form.listeners[event] = handler
    return this
  }

  /**
   * @param {string} name
   * @return {Schema}
   */
  addAction (name: string): Schema {
    this.__currentAction = name
    this.actions[name] = {
      color: 'primary',
      attrs: {
        label: '',
        disabled: false
      },
      listeners: {}
    }
    return this
  }

  /**
   * @param {string} attr
   * @param {*} value
   * @return {Schema}
   */
  actionSet (attr: string, value: any): Schema {
    // @ts-ignore
    this.actions[this.__currentAction].attrs[attr] = value
    return this
  }

  /**
   * @param {string} label
   * @return {Schema}
   */
  actionLabel (label: string): Schema {
    return this.actionSet('label', label)
  }

  /**
   * @param {string} event
   * @param {function(*): void} handler
   * @return {Schema}
   */
  actionOn (event: string, handler: Function): Schema {
    this.actions[this.__currentAction].listeners[event] = handler
    return this
  }

  /**
   */
  provide () {
    return {
      domain: this.domain,
      fields: () => this.fields,
      actions: () => this.actions,
    }
  }
}
