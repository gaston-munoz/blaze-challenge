import { Router } from 'express'
import { ROLES } from '../../common/constants.js'
import { TournamentController } from '../controllers/index.js'
import { authenticate } from '../middlewares/auth.js'

const router = Router({ strict: true })

router.post('/', authenticate(ROLES.USER), TournamentController.create)
router.get('/', TournamentController.getAll)

export default router