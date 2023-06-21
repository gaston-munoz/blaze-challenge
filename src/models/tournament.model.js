import { DataTypes, Model } from 'sequelize'
import { dbConnection } from '../storage/db-connection.js'
import { UserModel } from './index.js'

export class Tournament extends Model {}
Tournament.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: false,
    unique: true,
  },
  externalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emblem: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  areaName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  areaFlag: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
}, {
  sequelize: dbConnection,
})

UserModel.hasMany(Tournament, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

Tournament.belongsTo(UserModel, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})
