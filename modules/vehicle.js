const vehicleDao = require("../dao/vehicle")

async function getVehicle(req, res, next) {
  let {organizationId, startsAt, endsAt} = req.query
  let response = {
    error: true,
  }

  if (!organizationId) {
    return res.status(400).json(response)
  }

  try {
    let vehicle = await vehicleDao.getVehicle(organizationId, startsAt, endsAt)
    if (vehicle) {
      response.error = false
      response.vehicle = vehicle
    }
    return res.status(200).json(response)
  } catch (error) {
    logger.error(error)
    res.status(500).json(response)
  }
}

exports.getVehicle = getVehicle
