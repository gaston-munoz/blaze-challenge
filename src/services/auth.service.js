import { UserModel } from '../models/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class AuthService {
  constructor(userModel = null, tokenGenerator = null, hasher = null) {
    this.userModel = userModel || UserModel
    this.tokenGenerator = tokenGenerator || jwt
    this.privateKey = process.env.PRIVATE_KEY
    this.hasher = hasher || bcrypt

  }

  genToken(user) {
    const token = this.tokenGenerator.sign({ 
      id: user.id,  
      email: user.email,
      name: user.name,
    }, this.privateKey, {
      algorithm: 'HS256',
      expiresIn: '1d'
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