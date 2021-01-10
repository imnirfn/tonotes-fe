import { Model } from '@vuex-orm/core'
import User from './User'

export default class Notes extends Model {
  static entity = 'notes'

  static primaryKey = 'uuid'

  static fields() {
    return {
      uuid: this.attr(null),
      name: this.attr(''),
      title: this.attr(''),
      description: this.attr(''),
      isComplete: this.attr(''),

      userId: this.belongsTo(User, 'userId')
    }
  }
}
