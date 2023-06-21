import { Router } from 'express'
import { ROLES } from '../../common/constants.js'
import { TournamentController } from '../controllers/index.js'
import { authenticate } from '../middlewares/auth.js'

const router = Router({ strict: true })

router
  .route('/')
  .post(authenticate([ROLES.USER]), TournamentController.create)
  .get(TournamentController.getAll)

router
  .route('/users')
  .get(authenticate([ROLES.USER]), TournamentController.getAllByUser)

router
  .route('/:tournamentId')
//   .get(authenticate([ROLES.USER]), TournamentController.getOneByUser)
  .delete(authenticate([ROLES.USER]), TournamentController.deleteById)

export default router
