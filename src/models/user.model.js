import { DataTypes, Model } from 'sequelize'
import { ROLES } from '../common/constants.js';
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
  },
  role: {
    type: DataTypes.ENUM(ROLES.USER, ROLES.ADMIN),
    allowNull: false,
  }
}, {
  sequelize: dbConnection,
});

console.log(User === dbConnection.models.User)
