import joi from 'joi'
import { genError } from '../middlewares/errorHandler.js'
import { validate } from './validate.js'

const schema = joi.object({
  tournamentCode: joi.string().required().error(genError(400, 'tournamentCode must be a string')),
})
  .required()

const validateTournament = validate(schema) 

export { validateTournament }
  
