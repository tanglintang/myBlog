const fs = require('fs')
const md5 = require('md5')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const { getAsync, setAsync, delAsync } = require('../redis')
const { secret } = require('../config')
const UserModel = require('../models/user')

const postSignIn = async (ctx) => {
  const { account, password } = ctx.request.body
  await UserModel.findOne({
    where: {
      username: account
    }
  }).then(res => {
    if (!res) {
      ctx.body = {
        code: 500,
        message: '用户不存在'
      }
      return
    }
    if (res && res.dataValues.password === md5(password)) {
      const token = jwt.sign({ account }, secret, { expiresIn: '1h' })
      // 将 token 写入 redis
      setAsync(`admin:token:${account}`, token)

      ctx.body = {
        code: 200,
        message: 'success',
        token
      }
    } else {
      ctx.body = {
        code: 500,
        message: '用户密码错误'
      }
    }
  }).catch(err => {
    ctx.body = {
      code: 500,
      message: '服务器发生错误'
    }
    console.log(err)
  })
}

const verfiyToken = async (ctx) => {
  // 客户端 发送 的 token
  const token = ctx.request.header.authorization
  const playload = jwt.decode(token)
  const account = playload.account

  const correctToken = await getAsync(`admin:token:${account}`)

  if (correctToken === token) {
    ctx.body = {
      code: 200
    }
  } else {
    ctx.body = {
      code: 403
    }
  }
}

const uploadAvatar = async (upload) => {
  if (!upload) return

  let base64Data = upload.replace(/^data:image\/\w+;base64,/, ""),
  dataBuffer = new Buffer(base64Data, 'base64'),
  getName = Number(Math.random().toString().substr(3)).toString(36) + Date.now()
  await new Promise((resolve, reject) => {
    fs.writeFile('./static/images/' + getName + '.png', dataBuffer, err => {
      if (err) {
        throw(err)
        reject(false)
      }
      resolve(true)
    })
  })
  return getName + '.png'
}

const postSignUp = async (ctx) => {
  const {
    account,
    password,
    upload
  } = ctx.request.body
  await UserModel.findOne({
    where: {
      username: account
    }
  }).then(async res => {
    if (res) {
      ctx.body = {
        code: 403,
        message: '该用户已存在'
      }
      console.log('该用户已存在')
    } else {
      avatarName = await uploadAvatar(upload) || ''
      console.log(avatarName)

      await UserModel.create({
        username: account,
        password: md5(password),
        avatar: avatarName,
        signUpTime: moment().format('YYYY-MM-DD HH:mm:ss')
      }).then(res => {
        if (!res) {
          ctx.body = {
            message: '注册失败'
          }
          console.log('注册失败')
        } else {
          const token = jwt.sign({
            account
          }, secret, {
            expiresIn: '1h'
          })
          // 将 token 写入 redis
          setAsync(`admin:token:${account}`, token)
          ctx.body = {
            code: 200,
            message: '注册成功',
            token
          }
          console.log('注册成功')
        }
      })
    }
  })
}

const deleteToken = async (ctx) => {
  const token = ctx.request.header.authorization
  const playload = jwt.decode(token)
  const account = playload.account

  const status = await delAsync(`admin:token:${account}`)

  if (status !== 0) {
    ctx.body = {
      code: 200,
      message: 'success delete'
    }
  } else {
    ctx.body = {
      code: 403,
      message: 'failed delete'
    }
  }
}

module.exports = {
  postSignIn,
  verfiyToken,
  postSignUp,
  deleteToken
}