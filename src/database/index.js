import { Database } from '@vuex-orm/core'
import User from '../models/User'
import Session from '../models/Session'
import Zone from '../models/Zone'
import Role from '../models/Role'
import Notes from '../models/Notes'
// Relation
import UserRole from '../models/UserRole'

const database = new Database()

database.register(User)
database.register(Session)
database.register(Zone)
database.register(Role)
database.register(UserRole)
database.register(Notes)

export default database
