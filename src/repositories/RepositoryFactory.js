import UserRepository from './UserRepository'
import SessionRepository from './SessionRepository'
import ZoneRepository from './ZoneRepository'
import RoleRepository from './RoleRepository'
import NotesRepository from './NotesRepository'

export default {
  // userRepository: bind('userRepository', RepositoryInterface)
  user: new UserRepository(),
  session: new SessionRepository(),
  zone: new ZoneRepository(),
  role: new RoleRepository(),
  notes: new NotesRepository(),
}
