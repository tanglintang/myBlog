const Koa = require('koa')
const koaBody = require('koa-body')
const cors = require('koa-cors')
const staticCache = require('koa-static-cache')
const path = require('path')
const app = new Koa()

app.use(cors({
  origin: 'http://localhost:3000',
  exposeHeaders: ['WWW-Authenticate', 'Server-Authenticate'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content=Type', 'Authorization', 'Accept']
}))

app.config = require('./config')

// 表单提交的对象需要用 bodyParser 解析
app.use(koaBody({
    "formLimit":"5mb",
    "jsonLimit":"5mb",
    "textLimit":"5mb"
}))

const withRouter = require('./routes')

withRouter(app)

// 启用静态服务器以及缓存
app.use(staticCache(path.join(__dirname, './static'), {
  dynamic: true
},{
  maxAge: 365*24*60*60
}))

app.use(async (ctx) => {
  ctx.body = '404'
})

// 内部错误处理
app.on('error', function(err, ctx) {
  console.log('server error', err, ctx)
})

app.listen(app.config.port)
console.log(`listening on port ${app.config.port}`)
