const boom = require("@hapi/boom")
const logger = require("../libs/logger")

function errorStack(error, stack) {
  const esProduccion = false
  if (esProduccion) {
    return error
  }
  return { ...error, stack }
}

function wrapError(err) {
  if (!err.isBoom) {
    const boomError = boom.badImplementation(err)
    return boomError
  }
  return err
}

function logError(err) {
  logger.error(err)
}

function errorHandler(err, req, res, next) {
  logError(err)
  err = wrapError(err)

  const {
    output: { statusCode, payload },
  } = err

  res.status(statusCode)
  res.json(errorStack(payload, err.stack))
}

exports.errorHandler = errorHandler
