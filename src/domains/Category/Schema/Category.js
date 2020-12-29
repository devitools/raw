import Schema from '../../../core/Schema'
import { save } from 'src/domains/Category/Schema/services'

/**
 * @class {Category}
 */
export default class Category extends Schema {
  /**
   */
  construct () {
    this.addField('name')
      .fieldIsInput()
      .fieldFormLabel('Name')
      .fieldFormPlaceholder('Type a cute name')
      .fieldFormWidth('50')

    this.addField('type')
      .fieldIsSelect()
      .fieldFormLabel('Type')
      .fieldFormWidth('50')
      .fieldFormSet('options', [
        {
          value: 1,
          label: 'Cute'
        },
        {
          value: 2,
          label: 'Cool'
        }
      ])

    this.addField('description')
      .fieldIsTextarea()
      .fieldFormLabel('Description')

    this.addAction('save')
      .actionLabel('Salvar')
      .actionOn('click', function () {
        console.log('~> save')
        save(this.record)
          .then(console.log)
      })
  }
}
