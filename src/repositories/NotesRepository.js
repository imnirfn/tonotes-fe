import Repository from './Repository'
import Notes from './../models/Notes'
import datasource from '../datasources/baljs-rest-api'

export default class NotesRepository extends Repository {
  constructor() {
    super(Notes, datasource)
  }
}
