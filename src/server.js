import express, { json, urlencoded } from 'express'
import cors from 'cors'
import path from 'path'
import { configDotenv } from 'dotenv'
import morgan from 'morgan'
import router from './api/routes/index.js'
import { dirname } from './common/utils.js'
import { checkDBConnection } from './storage/db-connection.js'
import { errorHandler } from './api/middlewares/errorHandler.js'

const { __dirname } = dirname(import.meta)

configDotenv({
  path: path.join(__dirname, '../.env')
})

const app = express()

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/api', router)
app.use(errorHandler);

checkDBConnection()
app.listen(process.env.PORT, () => {
  console.log('NODE_ENV', process.env.NODE_ENV)
  console.log('Server listening on port', process.env.PORT)
});
