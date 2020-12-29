/**
 * @class {Schema}
 */
export default class Schema {
  /**
   */
  constructor () {
    this.schema = {}
    this.actions = {}
    this.__currentField = undefined
    this.__currentAction = undefined
    this.construct()
  }

  /**
   */
  construct () {
    throw new Error('override construct is required')
  }

  /**
   * @param {string} name
   * @return {Schema}
   */
  addField (name) {
    this.__currentField = name
    this.schema[name] = {
      is: 'input',
      form: {
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
  getField (name) {
    this.__currentField = name
    return this
  }

  fieldIs (is) {
    this.schema[this.__currentField].is = is
    return this
  }

  fieldIsInput () {
    return this.fieldIs('input')
  }

  fieldIsTextarea () {
    return this.fieldIs('textarea')
  }

  fieldIsSelect () {
    return this.fieldIs('select')
  }

  fieldFormSet (attr, value) {
    this.schema[this.__currentField].form.attrs[attr] = value
    return this
  }

  fieldFormLabel (label) {
    return this.fieldFormSet('label', label)
  }

  fieldFormWidth (width) {
    return this.fieldFormSet('width', width)
  }

  fieldFormHeight (height) {
    return this.fieldFormSet('height', height)
  }

  fieldFormOrder (order) {
    return this.fieldFormSet('order', order)
  }

  fieldFormPlaceholder (placeholder) {
    return this.fieldFormSet('placeholder', placeholder)
  }

  /**
   * @param {string} event
   * @param {function(*): void} handler
   * @return {Schema}
   */
  fieldFormOn (event, handler) {
    this.schema[this.__currentField].form.listeners[event] = handler
    return this
  }

  /**
   * @param {string} name
   * @return {Schema}
   */
  addAction (name) {
    this.__currentAction = name
    this.actions[name] = {
      color: 'btn btn-primary',
      attrs: {
        label: '',
        disabled: false
      },
      listeners: {}
    }
    return this
  }

  actionSet (attr, value) {
    this.actions[this.__currentAction].attrs[attr] = value
    return this
  }

  actionLabel (label) {
    return this.actionSet('label', label)
  }

  /**
   * @param {string} event
   * @param {function(*): void} handler
   * @return {Schema}
   */
  actionOn (event, handler) {
    this.actions[this.__currentAction].listeners[event] = handler
    return this
  }

  provide () {
    return {
      schema: () => this.schema,
      actions: () => this.actions,
    }
  }
}
