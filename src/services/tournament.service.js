import { TournamentModel } from '../models/index.js'
import { FootballRepository } from '../repositories/football.repository.js'

export class TournamentService {
  constructor(tournamentModel = null, footballRepository = null) {
    this.tournamentModel = tournamentModel || TournamentModel
    this.footballRepository = footballRepository || new FootballRepository()
  }

  async findAll() {
    const { count, competitions } = await this.footballRepository.getAllTournaments()
    return {
      count,
      tournaments: competitions
    }
  }

  async create(tournamentCode, user) {
    const tournament = await this.footballRepository.getByCode(tournamentCode)
    if (!tournament) return {
      error: 'Tournament not exists'
    }

    const userTournament = await this.tournamentModel.findOne({ 
      where: { 
        externalId: tournament.id, 
        userId: user.id 
      }
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
    const savedTournament = await this.tournamentModel.create(tournamentToSave)

    return { savedTournament }
  }

  async findByUser(user) {
    const { count, rows } = await this.tournamentModel.findAndCountAll({ where: { userId: user.id }})
    console.log(rows)
    return {
      tournaments: rows,
      count, 
    }
  }

  async deleteById(id) {
    const tournament = await this.tournamentModel.findOne({ where: { id }})
    if (!tournament) return {
      error: 'Tournament not exists'
    }
    await this.tournamentModel.destroy({ where: { id }})

    return { tournament }
  }
}

