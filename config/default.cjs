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

exports.STAGES = STAGES

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
  auth: {
    privateKey: process.env.PRIVATE_KEY,
    timeToExpireToken: '1d',
    tokenAlgorithm: 'HS256'
  },
  footballAPI: {
    endpoint: 'https://api.football-data.org/v4',
    apiKey: process.env.FOOTBALL_API_KEY,
    tournamentsPath: '/competitions',
  },
}