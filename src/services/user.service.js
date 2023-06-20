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
    console.log('user saved', dataValues)
    const { password: _, ...cleanUser } = dataValues
    return cleanUser
  }

  async signIn(email, password) {
    const user = await this.userModel.findOne({ where: { email }})
    if (!user) return {
      error: 'User not found',
    }

    const isValidPassword = await this.authService.verifyPassword(password, user.password)
    if (!isValidPassword) return {
      error: 'Invalid Password',
    }

    console.log('user signin', user)

    const token = this.authService.genToken(user)

    return  { token, user} 
  }

  findByEmail(email) {
    return this.userModel.findOne({ where: { email }})
  }
}