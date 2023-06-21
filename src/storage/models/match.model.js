import { DataTypes, Model } from 'sequelize'
import { dbConnection } from '../db-connection.js'
import { TournamentModel, UserModel } from './index.js'

export class Match extends Model {}
Match.init({
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
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  utcDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  group: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  winner: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  tournamentId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  areaName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  areaFlag: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  awayTeamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  awayTeamCrest: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  homeTeamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  homeTeamCrest: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: dbConnection,
})

UserModel.hasMany(Match, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

Match.belongsTo(UserModel, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  allowNull: false,
})

TournamentModel.hasMany(Match, {
  foreignKey: 'tournamentId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

Match.belongsTo(TournamentModel, {
  foreignKey: 'tournamentId',
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT',
  allowNull: true,
})
