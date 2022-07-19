const driverDao = require("../dao/driver")

async function getDriver(req, res, next) {
  let {organizationId, startsAt, endsAt} = req.query
  let response = {
    error: true,
  }

  if (!organizationId) {
    return res.status(400).json(response)
  }

  try {
    let driver = await driverDao.getDriver(organizationId, startsAt, endsAt)
    if (driver) {
      response.error = false
      response.driver = driver
    }
    return res.status(200).json(response)
  } catch (error) {
    logger.error(error)
    res.status(500).json(response)
  }
}

exports.getDriver = getDriver
