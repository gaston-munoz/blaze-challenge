import { FootballRepository } from '../repositories/footballAPI.repository.js'
import { TournamentRepository } from '../repositories/tournament.repository.js'
import { MatchRepository } from '../repositories/index.js'

export class MatchService {
  constructor(tournamentRepository = null, matchRepository = null, footballRepository = null) {
    this.tournamentRepository = tournamentRepository || new TournamentRepository()
    this.matchRepository = matchRepository || new MatchRepository()
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

    const userMatch = await this.matchRepository.findOne({ 
      externalId: match.id, 
      userId: user.id 
    })
    if (userMatch) return {
      error: 'Match already exists'
    }

    const existsTournament = await this.tournamentRepository.findOne({
      externalId: match.competition.id, 
      userId: user.id  
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
      homeTeamScore: match.score.fullTime.home,
      awayTeamScore: match.score.fullTime.away,
      competitionName: match.competition.name,
    } 
    
    const savedMatch = await this.matchRepository.create(matchToSave)

    return { savedMatch }
  }

  async findByUser(user) {
    const { count, rows } = await this.matchRepository.findAndCount({ userId: user.id })
    return {
      matches: rows,
      count, 
    }
  }

  async deleteById(id) {
    const match = await this.matchRepository.findOne({ id })
    if (!match) return {
      error: 'Match not exists'
    }
    await this.matchRepository.deleteById(id)

    return { match }
  }

  async findByTournament(code, season) {
    const { count, matches } = await this.footballRepository.getAllMatchesByTournament(code, season)
    return {
      count,
      matches,
    }
  }
}