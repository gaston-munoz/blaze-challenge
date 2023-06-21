import { ROLES } from '../common/constants.js'
import { UserModel } from '../models/index.js'
import { AuthService } from './auth.service.js'

export class UserService {
  constructor(userModel = null, authService = null) {
    this.userModel = userModel || UserModel
    this.authService = authService || new AuthService()
  }

  async create(user) {
    user.password = await this.authService.hashPassword(user.password)
    user.role = ROLES.USER
    const { dataValues } = await this.userModel.create(user)
    const { password: _, ...cleanUser } = dataValues
    return cleanUser
  }

  async signIn(email, password) {
    const savedUser = await this.userModel.scope('withPassword').findOne({ where: { email }})
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
    return this.userModel.findOne({ where: { email }})
  }
}