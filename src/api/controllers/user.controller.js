import { UserService } from '../../services/user.service.js'

const signUp = async (req, res) => {
  const { body } = req
  console.log('body', body)
  const userService = new UserService()
  const newUser = await userService.create(body)

  res.send({
    success: true,
    user: newUser
  })
}

const signIn = async (req, res) => {
  const { body } = req
  console.log('body', body)
  const userService = new UserService()
  const { token, user } = await userService.signIn(body.email, body.password)
  
  res.send({
    success: true,
    token: token,
    user,
  })
}

export { signUp, signIn }