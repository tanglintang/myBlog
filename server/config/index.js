const config = {
  port: 4000,
  database: {
    DATABASE: 'blog',
    USERNAME: 'root',
    PASSWORD: '',
    PORT: 3306,
    HOST: 'localhost'
  },
  router: {
    prefix: '/admin'
  },
  secret: 'tang'
}

module.exports = config