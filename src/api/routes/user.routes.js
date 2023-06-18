import { Router } from 'express'
import { UserController } from '../controllers/index.js'

console.log(UserController)

const router = Router({ strict: true })

router.post('/sign-up', UserController.signUp)
router.post('/sign-in', UserController.signIn)

export default router