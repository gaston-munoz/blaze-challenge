import { Sequelize } from 'sequelize'
import config from 'config'

const dbConfig = config.get('dbPostgres')

const dbConnection = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, {
  dialect: 'postgres',
  host: dbConfig.host,
  port: dbConfig.port,
  ssl: true,
  sync: { force: true },
  logging: false,
})

const checkDBConnection = async () => {
  try {
    await dbConnection.authenticate()
    await dbConnection.sync({ force: true })
    console.log('DB connection ready')
  } catch (error) {
    console.error('Unable to connect to the database:', error.message)
  }
}

export {
  checkDBConnection,
  dbConnection,
}