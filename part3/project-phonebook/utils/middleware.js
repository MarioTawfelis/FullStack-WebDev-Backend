const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error)

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    response.status(400).send({ error: error.message })
  }

  // If not, pass error to the defaul Express error handler
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}



// const morgan = require('morgan')

// morgan.token('req-body', (req) => {
//   return JSON.stringify(req.body)
// })

// const loggingFormat =
//   ':method :url :status :res[content-length] - :response-time ms :req-body'


// app.use(morgan(loggingFormat))