const controller = require('../controller/tags')

module.exports = (app, router) => {
  router.get('/api/tags', controller.getAllTags)

  router.post('/api/tags', controller.addNewTag)

  router.delete('/api/tags', controller.deleteTag)
}