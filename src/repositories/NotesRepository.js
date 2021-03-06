import Repository from './Repository'
import Notes from './../models/Notes'
import datasource from '../datasources/baljs-rest-api'

export default class NotesRepository extends Repository {
  constructor() {
    super(Notes, datasource)
  }

  async editComplete(data) {
    const { isComplete, uuid } = data
    return datasource({
      method: 'patch',
      url: `notes/${uuid}`,
      data: {
        isComplete
      }
    })
  }
}
