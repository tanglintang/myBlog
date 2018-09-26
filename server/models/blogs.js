const Sequelize = require('sequelize')
const sequelize = require('./index')

const Blogs = sequelize.define('blogs', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  title: {
    type: Sequelize.STRING,
    unique: true
  },
  author: {
    type: Sequelize.STRING,
    unique: true
  },
  toc: {
    type: Sequelize.STRING(2550),
    unique: true
  },
  markdownContent: {
    type: Sequelize.TEXT
  },
  htmlContent: {
    type: Sequelize.TEXT,
    unique: true
  },
  createTime: {
    type: Sequelize.DATE,
    unique: true,
    defaultValue: Date.now
  },
  viewTimes: {
    type: Sequelize.INTEGER,
    unique: true,
    defaultValue: 0
  },
  tags: {
    type: Sequelize.STRING
  },
  categories: {
    type: Sequelize.STRING
  }
})


module.exports = Blogs