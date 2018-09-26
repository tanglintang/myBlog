const Sequelize = require('sequelize')
const sequelize = require('./index')

// 数据表跟对象的映射 
// user => users 单数的user会自动对应users 
const User = sequelize.define('user',{
  id: { 
       type: Sequelize.INTEGER,
       autoIncrement:true,
       primaryKey: true,
       unique: true
      },
  username: { type: Sequelize.STRING, unique: true },
  password: { type: Sequelize.STRING, unique: true },
  avatar: { type: Sequelize.STRING },
  signUpTime: { type: Sequelize.STRING, unique: true },
})


module.exports = User
