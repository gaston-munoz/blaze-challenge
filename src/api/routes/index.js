import { Router } from 'express'
import UserRoutes from './user.routes.js'
import MatchRoutes from './match.routes.js'
import TournamentRoutes from './tournament.routes.js'

const mainRouter = Router()

mainRouter.use(UserRoutes)
mainRouter.use('/matches', MatchRoutes)
mainRouter.use('/tournaments', TournamentRoutes)

export default mainRouter