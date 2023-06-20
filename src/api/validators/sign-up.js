import joi from 'joi'
import { genError } from '../middlewares/errorHandler.js'
import { validate } from './validate.js'

const schema = joi.object({
  email: joi.string().required().error(genError(400, 'EMAIL must be provide')),
  name: joi.string().required().error(genError(400, 'NAME must be provide')),
  password: joi.string().required().error(genError(400, 'PASSWORD must be provide')),
})
  .required()

const validateSignUp = validate(schema) 

export { validateSignUp }
