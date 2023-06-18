import { Router } from 'express'
import { TournamentController } from '../controllers/index.js'

const router = Router({ strict: true })

router.post('/', TournamentController.create)
router.get('/', TournamentController.getAll)

export default router