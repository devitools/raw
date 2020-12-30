import Schema from '@devitools/agnostic/Schema'

/**
 * @class {Customer}
 */
export default class Customer extends Schema {
  /**
   * @type {string}
   */
  domain = 'customer'

  /**
   */
  construct () {
    this.addField('name')
      .fieldFormWidth('50')

    this.addField('email')
      .fieldFormWidth('50')

    this.addField('description')
      .fieldIsTextarea()
  }
}
