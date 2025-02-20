'use strict'

const micro = require('micro')
const { send, createError } = require('micro')
const { router, get, post, put, patch, del } = require('microrouter')

const signale = require('./utils/signale')
const pipe = require('./utils/pipe')
const auth = require('./utils/auth')

const ui = require('./routes/ui')
const tracker = require('./routes/tracker')
const tokens = require('./routes/tokens')
const domains = require('./routes/domains')
const records = require('./routes/records')
const views = require('./routes/views')
const referrers = require('./routes/referrers')

const catchError = (fn) => async (req, res) => {
  try {
    return await fn(req, res)
  } catch (err) {
    signale.fatal(err)

    if (err.statusCode != null) send(res, err.statusCode, err.message)
    else send(res, 500, err.message)
  }
}

const notFound = async () => {
  throw createError(404, 'Not found')
}

module.exports = micro(
  catchError(
    router(

      get('/', ui.index),
      get('/index.html', ui.index),
      get('/index.css', ui.styles),
      get('/index.js', ui.scripts),

      get('/tracker.js', tracker.get),

      post('/tokens', tokens.add),
      del('/tokens/:tokenId', tokens.del),

      post('/domains', pipe(auth, domains.add)),
      get('/domains', pipe(auth, domains.all)),
      put('/domains/:domainId', pipe(auth, domains.update)),
      del('/domains/:domainId', pipe(auth, domains.del)),

      post('/domains/:domainId/records', records.add),
      patch('/domains/:domainId/records/:recordId', records.update),

      get('/domains/:domainId/views', pipe(auth, views.get)),

      get('/domains/:domainId/referrers', pipe(auth, referrers.get)),

      get('/*', notFound),
      post('/*', notFound),
      put('/*', notFound),
      patch('/*', notFound),
      del('/*', notFound)

    )
  )
)
