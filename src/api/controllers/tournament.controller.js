import { STATUS_CODE } from '../../common/constants.js'
import { TournamentService } from '../../services/tournament.service.js'
import { genError } from '../middlewares/errorHandler.js'

const create = async (req, res, next) => {
  try {
    const { body, user } = req
    const tournamentService = new TournamentService()
    const { savedTournament, error } = await tournamentService.create(body.tournamentCode, user)
    if (error) throw genError(STATUS_CODE.BAD_REQ, error)

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
    const allTournaments = await tournamentService.findByUser(req.user)
  
    res.send({
      success: true,
      data: allTournaments,
    })
  } catch (error) {
    next(genError(STATUS_CODE.INT_SERV_ERROR, error.message))
  }
}

const deleteById = async (req, res, next) => {
  try {
    const { tournamentId } = req.params
    const tournamentService = new TournamentService()
    const { tournament, error } = await tournamentService.deleteById(tournamentId)
    if (error) throw genError(STATUS_CODE.BAD_REQ, error)

    res.send({
      success: true,
      tournament,
    })
  } catch (error) {
    next(genError(STATUS_CODE.INT_SERV_ERROR, error.message))
  }
}

export { create, getAll, getAllByUser, deleteById }
