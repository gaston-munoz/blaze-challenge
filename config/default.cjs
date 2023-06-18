const path = require('path')
const { configDotenv } = require('dotenv')
configDotenv({
  path: path.join(__dirname, '../.env')
})

const STAGES = Object.freeze({
  TEST: 'test',
  DEV: 'development',
  PROD: 'production',
})

module.exports = {
  app: {
    port: process.env.PORT,
    stage: process.env.NODE_ENV,
    isDevelop: process.env.NODE_ENV === STAGES.DEV,
  },
  dbPostgres: {
    port: process.env.POSTGRES_PORT,
    host: process.env.POSTGRES_HOST,
    dbName: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
}