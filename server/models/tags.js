const Sequelize = require('sequelize')
const sequelize = require('./index')

// 数据表跟对象的映射 
const Tags = sequelize.define('tags', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  tagName: {
    type: Sequelize.STRING,
    unique: true
  }
})


module.exports = Tags