require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DEV_USER,
    password: process.env.DEV_PASS,
    database: process.env.DEV_DB,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  docker: {
    username: process.env.DOCK_USER,
    password: process.env.DOCK_PASSWORD,
    database: process.env.DOCK_DB,
    host: process.env.DOCK_HOST,
    dialect: 'postgres'
  },
  test: {
    username: process.env.TEST_USER || process.env.DEV_USER,
    password: process.env.TEST_PASS || process.env.DEV_PASS,
    database: process.env.TEST_DB || process.env.DEV_DB,
    host: process.env.TEST_HOST || '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: process.env.PROD_USER,
    password: process.env.PROD_PASS,
    database: process.env.PROD_DB,
    host: process.env.PROD_HOST,
    dialect: 'postgres'
  }
}
