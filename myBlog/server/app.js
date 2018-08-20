const Koa = require('koa'),
  router = require('koa-router'),
  json = require('koa-json'),
  logger = require('koa-logger');    // 引入依赖

const app = new Koa()

app.use(require('koa-bodyparser')())
app.use(json())
app.use(logger())

app.use(function* (next) {
  let start = new Date
  yield next
  let ms = new Date - start
  console.log('%s %s - %s', this.method, this.url, ms)
})

app.on('error', function(err, ctx) {
  console.log('server error', err)
  ctx.body({
    code: 500,
    message: 'server error'
  })
})

app.listen(8889, () => {
  console.log('koa is listening in 8889')
})

module.exports = app
