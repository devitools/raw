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
      .actionOn('click', async function () {
        this.$loading.show()
        try {
          await save(this.record)
          this.$notification.success(this.$t('app.schema.actions.save.success'))
        } catch (e) {
          this.$notification.error(this.$t('app.schema.actions.save.error'))
        }
        this.$loading.hide()
      })
  }
}
