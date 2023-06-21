import { TournamentModel, MatchModel } from '../models/index.js'
import { FootballRepository } from '../repositories/football.repository.js'

export class MatchService {
  constructor(tournamentModel = null, matchModel = null, footballRepository = null) {
    this.tournamentModel = tournamentModel || TournamentModel
    this.matchModel = matchModel || MatchModel
    this.footballRepository = footballRepository || new FootballRepository()
  }

  async findAll() {
    const { count, matches } = await this.footballRepository.getAllMatches()
    return {
      count,
      matches,
    }
  }

  async findById(id) {
    const match = await this.footballRepository.getMatchById(id)
    if (!match || match.errorCode) return {
      error: 'Match not exists'
    }

    return { match }
  }

  async create(matchId, user) {
    const match = await this.footballRepository.getMatchById(matchId)
    if (!match || match.errorCode) return {
      error: 'Match not exists'
    }

    console.log({ match })

    const userMatch = await this.matchModel.findOne({ 
      where: { 
        externalId: match.id, 
        userId: user.id 
      }
    })
    if (userMatch) return {
      error: 'Match already exists'
    }

    const existsTournament = await this.tournamentModel.findOne({
      where: {
        externalId: match.competition.id, 
        userId: user.id  
      }
    })


    const matchToSave = {
      externalId: match.id,
      status: match.status,
      utcDate: match.utcDate,
      group: match.gorup,
      userId: user.id,
      winner: match.score.winner,
      tournamentId: existsTournament?.id,
      areaName: match.area.name,
      areaFlag: match.area.flag,
      awayTeamName: match.awayTeam.name,
      awayTeamCrest: match.awayTeam.crest,
      homeTeamName: match.homeTeam.name,
      homeTeamCrest: match.homeTeam.crest,
    } 
    
    const savedMatch = await this.matchModel.create(matchToSave)

    return { savedMatch }
  }

  async findByUser(user) {
    const { count, rows } = await this.matchModel.findAndCountAll({ where: { userId: user.id }})
    console.log(rows)
    return {
      matches: rows,
      count, 
    }
  }

  async deleteById(id) {
    const match = await this.matchModel.findOne({ where: { id }})
    if (!match) return {
      error: 'Match not exists'
    }
    await this.matchModel.destroy({ where: { id }})

    return { match }
  }
}