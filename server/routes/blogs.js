const controller = require('../controller/blogs')

module.exports = (app, router) => {
  router.post('/api/blogs/postBlog', controller.createBlog)  
  router.get('/api/blogs/getBlogs', controller.getAllBlogs)

  router.delete('/api/blogs/delBlog', controller.deleteBlog)

  router.put('/api/blogs/updateBlog', controller.updateBlog)
}
