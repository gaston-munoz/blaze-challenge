import express, { json, urlencoded } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import config from 'config'
import router from './api/routes/index.js'
import { checkDBConnection } from './storage/db-connection.js'
import { errorHandler } from './api/middlewares/errorHandler.js'

const app = express()
const appConfig = config.get('app')

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/api', router)
app.use(errorHandler);

checkDBConnection()
app.listen(appConfig.port, () => {
  console.log('APP STAGE', appConfig.stage)
  console.log('Server listening on port', appConfig.port)
});
