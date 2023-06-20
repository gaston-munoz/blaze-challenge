import { genError } from '../middlewares/errorHandler.js'

export const validate = (schema) => (req, res, next) => {
  try {
    const { body } = req
    const { error, value } = schema.validate(body)
      
    if(error) {
      throw new Error(error.message)
    }
    req.body = value
    
    next()
  } catch (error) {
    next(genError(400, error.message))
  }
}   