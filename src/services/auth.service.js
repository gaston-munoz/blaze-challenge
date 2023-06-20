import { UserModel } from '../models/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from 'config'

export class AuthService {
  constructor(userModel = null, tokenGenerator = null, hasher = null) {
    const authConfig = config.get('auth')
    this.userModel = userModel || UserModel
    this.tokenGenerator = tokenGenerator || jwt
    this.privateKey = authConfig.privateKey
    this.hasher = hasher || bcrypt
    this.timeToExpireToken = authConfig.timeToExpireToken
    this.tokenAlgorithm = authConfig.tokenAlgorithm
  }

  genToken(user) {
    const token = this.tokenGenerator.sign({ 
      id: user.id,  
      email: user.email,
      name: user.name,
      role: user.name,
    }, this.privateKey, {
      algorithm: this.tokenAlgorithm,
      expiresIn: this.timeToExpireToken
    })

    console.log({ token })

    return token
  }

  verifyToken(token) {
    const payload = this.tokenGenerator.verify(token, this.privateKey)

    console.log({ payload })

    return payload
  }

  async hashPassword(password) {
    const salt = await this.hasher.genSalt(10)
    return this.hasher.hash(password, salt)
  }

  verifyPassword(password, encrypted) {
    return this.hasher.compare(password, encrypted)
  }
}