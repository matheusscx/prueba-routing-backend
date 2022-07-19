const routeDao = require("../dao/route")

async function getRoute(req, res, next) {
  let organizationId = req.query.organization_id
  let response = {
    error: true,
    route: [],
  }

  try {
    let route = await routeDao.getRoute(organizationId, null)
    if (route) {
      response.error = false
      response.route = route
    }
    return res.status(200).json(response)
  } catch (error) {
    logger.error(error)
    response.error = error
    next(error)
  }
}
async function createRoute(req, res, next) {
  let body = req.body
  let { driver } = body
  let response = {
    error: true,
    route: [],
  }

  try {
    let route = await routeDao.createRoute(body)
    if (route) {
      response.error = false
      response.route = route
    }
    return res.status(200).json(response)
  } catch (error) {
    logger.error(error)
    response.error = error
    next(error)
  }
}
async function deleteRoute(req, res, next) {
  let { routeId } = req.query
  let response = {
    error: true,
    route: [],
  }

  try {
    let route = await routeDao.deleteRoute(routeId)
    if (route) {
      response.error = false
      response.route = route
    }
    return res.status(200).json(response)
  } catch (error) {
    logger.error(error)
    response.error = error
    next(error)
  }
}

async function updateRoute(req, res, next) {
  let body = req.body
  let response = {
    error: true,
    route: [],
  }

  try {
    let route = await routeDao.updateRoute(body)
    if (route) {
      response.error = false
      response.route = route
    }
    return res.status(200).json(response)
  } catch (error) {
    logger.error(error)
    response.error = error
    next(error)
  }
}

exports.getRoute = getRoute
exports.createRoute = createRoute
exports.deleteRoute = deleteRoute
exports.updateRoute = updateRoute
