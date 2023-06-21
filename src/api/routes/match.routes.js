import { Router } from 'express'
import { ROLES } from '../../common/constants.js'
import { MatchController } from '../controllers/index.js'
import { authenticate } from '../middlewares/auth.js'
import { validateMatch } from '../validators/create-match.js'
import { validateParamId } from '../validators/param-id.js'

const router = Router({ strict: true })

router
  .route('/')
  .post(authenticate([ROLES.USER]), validateMatch, MatchController.create)
  .get(MatchController.getAll)

router
  .route('/users')
  .get(authenticate([ROLES.USER]), MatchController.getAllByUser)

router
  .route('/:id')
  .get(validateParamId, MatchController.getById)
  .delete(authenticate([ROLES.USER]), validateParamId, MatchController.deleteById)

export default router
