import { Router } from 'express'
import { ROLES } from '../../common/constants.js'
import { MactController } from '../controllers/index.js'
import { authenticate } from '../middlewares/auth.js'

const router = Router({ strict: true })

router
  .route('/')
  .post(authenticate([ROLES.USER]), MactController.create)
  .get(MactController.getAll)

// router
//   .route('/users')
//   .get(authenticate([ROLES.USER]), MactController.getAllByUser)

// router
//   .route('/:idMatch')
//   .get(authenticate([ROLES.USER]), MactController.getOneByUser)
//   .delete(authenticate([ROLES.USER]), MactController.getByUser)

export default router
