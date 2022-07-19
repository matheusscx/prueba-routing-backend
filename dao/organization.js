const db = require("../db/index")
const logger = require("../libs/logger")

async function getOrganization() {
  let response
  let query = `SELECT organization_id, name FROM public.organization;`

  try {
    response = await db.query(query)
    if (response && response.length) {
      return response
    }
    return null
  } catch (error) {
    logger.error(error)
    return null
  }
}

exports.getOrganization = getOrganization
