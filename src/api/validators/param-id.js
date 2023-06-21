import joi from 'joi'
import { genError } from '../middlewares/errorHandler.js'
import { validate } from './validate.js'

const schema = joi.object({
  id: joi.number().positive().required().error(genError(400, 'id must be an integer')),
})
  .required()

const validateParamId = validate(schema, 'params') 

export { validateParamId }
