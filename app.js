const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const index = require('./api/index')
const channels = require('./api/channels')
const blocks = require('./api/blocks')

const helpers = require('./middleware/helpers')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(helpers)

app.use('/', index)
app.use('/channels', channels)
app.use('/channels', blocks)

app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function(err, req, res, next) {
  res.locals.message = err.message
res.locals.error = req.app.get('env') === 'development' ? err : {}
res.status(err.status || 500)
res.render('error')
})

module.exports = app