import { STATUS_CODE } from '../../common/constants.js'
import { UserService } from '../../services/index.js'
import { genError } from '../middlewares/errorHandler.js'

const signUp = async (req, res, next) => {
  try {
    const { body } = req
    const userService = new UserService()
    const existsUser = await userService.findByEmail(body.email)
    if (existsUser) next(genError(STATUS_CODE.BAD_REQ, 'Email already exists'))
    
    const newUser = await userService.create(body)

    res.send({
      success: true,
      user: newUser
    })
  } catch (error) {
    next(genError(STATUS_CODE.INT_SERV_ERROR, error.message))
  }
}

const signIn = async (req, res, next) => {
  try {
    const { body } = req
    const userService = new UserService()
    const { token, user, error } = await userService.signIn(body.email, body.password)
    if (error) throw genError(STATUS_CODE.BAD_REQ, error)

    res.send({
      success: true,
      token: token,
      user,
    })
  } catch (error) {
    next(genError(error.statusCode, error.message))
  }
}

export { signUp, signIn }
