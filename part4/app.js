const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.set('strictQuery', false)
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MonogDB')
  })
  .catch(error => logger.error('error connecting to MonogoDB:', error.message))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor, blogRouter)

app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app