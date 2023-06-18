import { Sequelize } from "sequelize";

const dbConnection = new Sequelize('tournament_management_db', 'user', 'example', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  ssl: true,
  sync: { force: true },
})

const checkDBConnection = async () => {
  try {
    await dbConnection.authenticate()
    await dbConnection.sync({ force: true })
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error.message)
  }
}

export {
  checkDBConnection,
  dbConnection,
}