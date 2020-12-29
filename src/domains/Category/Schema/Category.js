import Schema from '../../../core/Schema'
import { save } from 'src/domains/Category/Schema/services'

/**
 * @class {Category}
 */
export default class Category extends Schema {
  /**
   * @type {string}
   */
  domain = 'category'

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

    this.addAction('save')
      .actionOn('click', function () {
        console.log('~> save')
        save(this.record)
          .then(console.log)
      })
  }
}
