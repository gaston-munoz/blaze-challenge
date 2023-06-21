import { FootballRepository } from '../repositories/footballAPI.repository.js'
import { TournamentRepository } from '../repositories/index.js'

export class TournamentService {
  constructor(tournamentRepository = null, footballRepository = null) {
    this.tournamentRepository = tournamentRepository || new TournamentRepository()
    this.footballRepository = footballRepository || new FootballRepository()
  }

  async findAll() {
    const { count, competitions } = await this.footballRepository.getAllTournaments()
    return {
      count,
      tournaments: competitions
    }
  }

  async findById(id) {
    const tournament = await this.footballRepository.getTournamentById(id)
    if (!tournament || tournament.errorCode) return {
      error: 'Tournament not exists'
    }

    return { tournament }
  }

  async create(tournamentCode, user) {
    const tournament = await this.footballRepository.getByCode(tournamentCode)
    if (!tournament) return {
      error: 'Tournament not exists'
    }

    const userTournament = await this.tournamentRepository.findOne({
      externalId: tournament.id, 
      userId: user.id 
    })
    if (userTournament) return {
      error: 'User has already saved this tournament'
    }

    const tournamentToSave = {
      externalId: tournament.id,
      name: tournament.name,
      type: tournament.type,
      emblem: tournament.emblem,
      areaName: tournament.area.name,
      areaFlag: tournament.area.flag,
      userId: user.id,
    } 
    const savedTournament = await this.tournamentRepository.create(tournamentToSave)

    return { savedTournament }
  }

  async findByUser(user) {
    const { count, rows } = await this.tournamentRepository.findAndCount({ userId: user.id })
    return {
      tournaments: rows,
      count, 
    }
  }

  async deleteById(id) {
    const tournament = await this.tournamentRepository.findOne({ id })
    if (!tournament) return {
      error: 'Tournament not exists'
    }
    await this.tournamentRepository.deleteById(id)

    return { tournament }
  }
}

