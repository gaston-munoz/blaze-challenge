import { DataTypes, Model } from 'sequelize'
import { dbConnection } from '../storage/db-connection.js'

export class User extends Model {}
User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  email: {
    type: DataTypes.STRING,
    trim: true,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize: dbConnection,
});

console.log(User === dbConnection.models.User)
