import { Router } from 'express'
import { MactController } from '../controllers/index.js'

const router = Router({ strict: true })

router.post('/', MactController.create)
router.get('/', MactController.getAll)

export default router