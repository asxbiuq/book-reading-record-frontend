import { Sequelize, Model, DataTypes } from 'sequelize'

const sequelize = new Sequelize('sqlite::memory:')
const Comment = sequelize.define('Comment', {
  creator: DataTypes.STRING,
  time: DataTypes.DATE,
  avatar: DataTypes.STRING,
  content: DataTypes.STRING,
  postId: DataTypes.STRING,
  replies: DataTypes.ARRAY,
})

