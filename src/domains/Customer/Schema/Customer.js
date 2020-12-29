import Category from '../../Category/Schema/Category'

/**
 * @class {Customer}
 */
export default class Customer extends Category {
  construct () {
    super.construct()

    this.getField('name')
      .fieldFormWidth('50')
      .fieldFormOrder('1')

    this.addField('email')
      .fieldFormLabel('Email Address')
      .fieldFormPlaceholder('wilcorrea@gmail.com')
      .fieldFormWidth('50')
      .fieldFormOrder('2')

    this.getField('description')
      .fieldFormOrder('3')
  }
}
