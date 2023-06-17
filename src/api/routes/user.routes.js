import { Router } from 'express'
import { UserController } from '../controllers/index.js'

const router = Router({ strict: true })

router.use('/sign-up', UserController.signUp)
router.use('/sign-in', UserController.signIn)

export default router