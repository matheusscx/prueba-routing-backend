const organizationDao = require("../dao/organization")

async function getOrganization(req, res, next) {
  let response = {
		error: false,
		organization: []
	}
  try {
    let organization = await organizationDao.getOrganization()
    if (organization) {
      response.organization = organization
    }
    return res.status(200).json(response)
  } catch (error) {
		logger.error(error)
		response.error = true
    res.status(500).json(response)
  }
}

exports.getOrganization = getOrganization
