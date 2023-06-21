import { TournamentModel } from '../storage/models/index.js'
import { BaseRepository } from './base.repository.js'

export class TournamentRepository extends BaseRepository{
  constructor(model = null) {
    super(model || TournamentModel)
  }
}