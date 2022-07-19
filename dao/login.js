const db = require("../db/index");
const logger = require("../libs/logger");


async function login(user, password) {
  let response
  let query = `select true`;

  try {
    response = await db.query(query);
    if (response && response.length) {
      return response[0];
    }
  } catch (error) {
    logger.error(error)
    return null
  }
  
}

exports.login = login