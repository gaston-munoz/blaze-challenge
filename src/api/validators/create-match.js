import joi from 'joi'
import { genError } from '../middlewares/errorHandler.js'
import { validate } from './validate.js'

const schema = joi.object({
  matchId: joi.number().positive().required().error(genError(400, 'matchId must be integer')),
})
  .required()

const validateMatch = validate(schema) 

export { validateMatch }
  
