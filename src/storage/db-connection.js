import { Sequelize } from "sequelize";

const dbConnection = new Sequelize('database', 'username', 'password', {
  dialect: 'postgres',
  host: 'my.server.tld',
  port: 12345,
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