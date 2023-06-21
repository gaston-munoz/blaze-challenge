import { MatchModel } from '../storage/models/index.js'
import { BaseRepository } from './base.repository.js'

export class MatchRepository extends BaseRepository{
  constructor(model = null) {
    super(model || MatchModel)
  }
}