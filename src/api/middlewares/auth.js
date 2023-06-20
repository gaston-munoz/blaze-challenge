import { STATUS_CODE } from '../../common/constants.js'
import { AuthService } from '../../services/auth.service.js'
import { genError } from './errorHandler.js'

export const authenticate = (roles = []) => (req, res, next) => {
  try {
    console.log(req.headers)
    const token = req.headers['x-authorization']
    console.log('token', token)

    if (!token) throw new Error('Missing Token')
    const authService = new AuthService()
    const payload = authService.verifyToken(token)
    if(!roles.includes(payload.role)) throw new Error('Unauthorizated user')
    req.user = payload

    next()
  } catch (error) {
    console.log('AUTH ERROR', error)
    next(genError(STATUS_CODE.BAD_REQ, error.message))
  }
}
