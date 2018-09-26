const controller = require('../controller/user')

module.exports = (app, router) => {

  router.post('/api/signIn', controller.postSignIn)
  router.get('/api/signIn/token', controller.verfiyToken)

  router.post('/api/signUp', controller.postSignUp)

  router.delete('/api/signIn/token', controller.deleteToken)
}
