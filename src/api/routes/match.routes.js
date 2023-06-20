import { Router } from 'express'
import { ROLES } from '../../common/constants.js'
import { MactController } from '../controllers/index.js'
import { authenticate } from '../middlewares/auth.js'

const router = Router({ strict: true })

router.post('/', authenticate([ROLES.USER]), MactController.create)
router.get('/', MactController.getAll)

export default router