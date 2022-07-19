const actionDao = require("../dao/action")

async function getAction(req, res, next) {
  let response = {
		error: false,
		action: []
	}
  try {
    let action = await actionDao.getAction()
    if (action) {
      response.action = action
    }
    return res.status(200).json(response)
  } catch (error) {
		logger.error(error)
		response.error = true
    res.status(500).json(response)
  }
}

exports.getAction = getAction
