import { TournamentModel } from '../models/index.js'
import { FootballRepository } from '../repositories/football.repository.js'
import { AuthService } from './auth.service.js'

export class TournamentService {
  constructor(tournamentModel = null, authService = null, footballRepository = null) {
    this.tournamentModel = tournamentModel || TournamentModel
    this.authService = authService || new AuthService()
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
      regionName: tournament.area.name,
      regionFlag: tournament.area.flag,
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

  // async signIn(email, password) {
  //   const savedUser = await this.userModel.findOne({ where: { email }})
  //   if (!savedUser) return {
  //     error: 'User not found',
  //   }

  //   const isValidPassword = await this.authService.verifyPassword(password, savedUser.password)
  //   if (!isValidPassword) return {
  //     error: 'Invalid Password',
  //   }

  //   const user = savedUser.dataValues
  //   delete user.password

  //   console.log('user signin', user)

  //   const token = this.authService.genToken(user)

  //   return  { token, user} 
  // }


}