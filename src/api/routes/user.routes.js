import { Router } from 'express'
import { UserController } from '../controllers/index.js'
import { validateSignIn, validateSignUp } from '../validators/index.js'

const router = Router({ strict: true })

router.post('/sign-up', validateSignUp, UserController.signUp)
router.post('/sign-in', validateSignIn, UserController.signIn)

export default router
