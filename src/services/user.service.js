import { ROLES } from '../common/constants.js'
import { UserRepository } from '../repositories/index.js'
import { AuthService } from './auth.service.js'

export class UserService {
  constructor(userRepository = null, authService = null) {
    this.userRepository = userRepository || new UserRepository()
    this.authService = authService || new AuthService()
  }

  async create(user) {
    user.password = await this.authService.hashPassword(user.password)
    user.role = ROLES.USER
    return this.userRepository.create(user)
  }

  async signIn(email, password) {
    const savedUser = await this.userRepository.findUserWithPassword(email)
    if (!savedUser) return {
      error: 'User not found',
    }

    const isValidPassword = await this.authService.verifyPassword(password, savedUser.password)
    if (!isValidPassword) return {
      error: 'Invalid Password',
    }

    const user = savedUser.dataValues
    delete user.password

    const token = this.authService.genToken(user)

    return  { token, user} 
  }

  findByEmail(email) {
    return this.userRepository.findOne({ email })
  }
}