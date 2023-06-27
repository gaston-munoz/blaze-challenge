import { UserModel } from '../storage/models/index.js'
import { BaseRepository } from './base.repository.js'

export class UserRepository extends BaseRepository {
  constructor(model = null) {
    super(model || UserModel)
  }

  findUserWithPassword(email) {
    return this.model.scope('withPassword').findOne({ where: { email }})
  }

  async create(entity) {
    const { dataValues } = await this.model.create(entity)
    const { password, ...user } = dataValues
    return user
  }
}