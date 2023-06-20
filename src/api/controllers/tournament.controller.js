import { STATUS_CODE } from '../../common/constants.js'
import { TournamentService } from '../../services/tournament.service.js'
import { genError } from '../middlewares/errorHandler.js'

const create = async (req, res, next) => {
  try {
    const { body, user } = req
    console.log('body', body, user)
    const tournamentService = new TournamentService()
    const { savedTournament, error } = await tournamentService.create(body.tournamentCode, user)
    if (error) next(genError(STATUS_CODE.BAD_REQ, error))

    res.send({
      success: true,
      tournament: savedTournament
    })
  } catch(error) {
    next(genError(STATUS_CODE.INT_SERV_ERROR, error.message))
  }

}

const getAll = async (req, res, next) => {
  try {
    const tournamentService = new TournamentService()
    const allTournaments = await tournamentService.findAll()
  
    res.send({
      success: true,
      data: allTournaments,
    })
  } catch (error) {
    next(genError(STATUS_CODE.INT_SERV_ERROR, error.message))
  }
}

const getAllByUser = async (req, res, next) => {
  try {
    const tournamentService = new TournamentService()
    const allTournaments = await tournamentService.findByUser()
  
    res.send({
      success: true,
      data: allTournaments,
    })
  } catch (error) {
    next(genError(STATUS_CODE.INT_SERV_ERROR, error.message))
  }
}

export { create, getAll, getAllByUser }
