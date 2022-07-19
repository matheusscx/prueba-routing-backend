const db = require("../db/index")
const logger = require("../libs/logger")

async function getAction() {
  let response
  let query = `SELECT action_id, name FROM public.action;`

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

exports.getAction = getAction