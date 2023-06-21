import joi from 'joi'
import { genError } from '../middlewares/errorHandler.js'
import { validate } from './validate.js'

const schema = joi.object({
  email: joi.string().email().required().error(genError(400, 'EMAIL must be provide')),
  name: joi.string().min(4).required().error(genError(400, 'NAME must be provide')),
  password: joi.string().min(4).required().error(genError(400, 'PASSWORD must be provide')),
})
  .required()

const validateSignUp = validate(schema) 

export { validateSignUp }
