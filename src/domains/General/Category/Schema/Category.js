import Schema from 'src/core/Schema'

/**
 * @class {Category}
 */
export default class Category extends Schema {
  /**
   * @type {string}
   */
  domain = 'general/category'

  /**
   */
  construct () {
    this.addField('name')
      .fieldIsInput()
      .fieldFormWidth('50')

    this.addField('type')
      .fieldIsSelect()
      .fieldFormWidth('50')

    this.addField('description')
      .fieldIsTextarea()
  }
}
