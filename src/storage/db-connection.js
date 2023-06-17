import { Sequelize } from "sequelize";

const dbConnection = new Sequelize('tournament_management_db', 'user', 'example', {
  dialect: 'postgres',
  host: 'postgres-container',
  port: 5432,
  ssl: true,
  sync: { force: true },
})

const checkDBConnection = async () => {
  try {
    await dbConnection.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export {
  checkDBConnection,
  dbConnection,
}