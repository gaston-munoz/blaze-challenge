import { STATUS_CODE } from '../../common/constants.js'
import { MatchService } from '../../services/index.js'
import { genError } from '../middlewares/errorHandler.js'

const getById = async (req, res, next) => {
  try {
    const { matchId } = req.params
    const matchService = new MatchService()
    const { match, error } = await matchService.findById(matchId)
    if (error) throw genError(STATUS_CODE.BAD_REQ, error)

    res.send({
      success: true,
      match,
    })
  } catch (error) {
    next(genError(STATUS_CODE.INT_SERV_ERROR, error.message))
  }
}

const create = async (req, res, next) => {
  try {
    const { body, user } = req
    const matchService = new MatchService()
    const { savedMatch, error } = await matchService.create(body.matchId, user)
    if (error) throw genError(STATUS_CODE.BAD_REQ, error)

    res.send({
      success: true,
      match: savedMatch
    })
  } catch(error) {
    next(genError(STATUS_CODE.INT_SERV_ERROR, error.message))
  }
}

const getAll = async (req, res, next) => {
  try {
    const matchService = new MatchService()
    const allMatches = await matchService.findAll()
  
    res.send({
      success: true,
      data: allMatches,
    })
  } catch (error) {
    next(genError(STATUS_CODE.INT_SERV_ERROR, error.message))
  }
}

const getAllByUser = async (req, res, next) => {
  try {
    const matchService = new MatchService()
    const allMatches = await matchService.findByUser(req.user)
  
    res.send({
      success: true,
      data: allMatches,
    })
  } catch (error) {
    next(genError(STATUS_CODE.INT_SERV_ERROR, error.message))
  }
}

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params
    const matchService = new MatchService()
    const { match, error } = await matchService.deleteById(id)
    if (error) throw genError(STATUS_CODE.BAD_REQ, error)

    res.send({
      success: true,
      match,
    })
  } catch (error) {
    next(genError(STATUS_CODE.INT_SERV_ERROR, error.message))
  }
}

export { create, getAll, getAllByUser, deleteById, getById }