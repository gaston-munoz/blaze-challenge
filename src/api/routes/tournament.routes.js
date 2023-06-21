import { Router } from 'express'
import { ROLES } from '../../common/constants.js'
import { TournamentController } from '../controllers/index.js'
import { authenticate } from '../middlewares/auth.js'
import { validateTournament } from '../validators/create-tournament.js'
import { validateParamId } from '../validators/param-id.js'

const router = Router({ strict: true })

router
  .route('/')
  .post(authenticate([ROLES.USER]), validateTournament, TournamentController.create)
  .get(TournamentController.getAll)

router
  .route('/users')
  .get(authenticate([ROLES.USER]), TournamentController.getAllByUser)

router
  .route('/:id')
  .get(validateParamId, TournamentController.getById)
  .delete(authenticate([ROLES.USER]), validateParamId, TournamentController.deleteById)

export default router
