import { genError } from '../middlewares/errorHandler.js'

export const validate = (schema, section = 'body') => (req, res, next) => {
  try {
    const obj = req[section]
    const { error, value } = schema.validate(obj)
      
    if(error) {
      throw new Error(error.message)
    }
    req[section] = value
    
    next()
  } catch (error) {
    next(genError(400, error.message))
  }
}   