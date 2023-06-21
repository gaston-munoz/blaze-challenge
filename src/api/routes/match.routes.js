import { Router } from 'express'
import { ROLES } from '../../common/constants.js'
import { MatchController } from '../controllers/index.js'
import { authenticate } from '../middlewares/auth.js'

const router = Router({ strict: true })

router
  .route('/')
  .post(authenticate([ROLES.USER]), MatchController.create)
  .get(MatchController.getAll)

router
  .route('/users')
  .get(authenticate([ROLES.USER]), MatchController.getAllByUser)

router
  .route('/:matchId')
  .get(MatchController.getById)
  .delete(authenticate([ROLES.USER]), MatchController.deleteById)

export default router
