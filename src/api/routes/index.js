import { Router } from 'express'
import UserRoutes from './user.routes.js'

const mainRouter = Router()

mainRouter.use(UserRoutes)

export default mainRouter