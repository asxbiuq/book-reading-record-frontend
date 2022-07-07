import { Sequelize, Model, DataTypes } from 'sequelize'

const sequelize = new Sequelize('sqlite::memory:')
const Reply = sequelize.define('Reply', {
  creator: DataTypes.STRING,
  avatar: DataTypes.STRING,
  time: DataTypes.DATE,
  content: DataTypes.STRING,
  commentId: DataTypes.STRING,
  replyId: DataTypes.STRING,
})
