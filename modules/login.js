const loginDao = require("../dao/login")
const crypto = require("crypto-js")
const jwt = require("jsonwebtoken")

async function login(req, res, next) {
  let { password, email } = req.body
  let passwordSha256 = crypto.SHA256(password).toString()
  let user
  try {
    user = await loginDao.login(email, passwordSha256)
    if (user) {
      const token = jwt.sign(user, process.env.SEED_TOKEN, {
        expiresIn: process.env.EXPIRATION_TOKEN,
      })

      res.status(200).json({ token })
      return
    }

    res.status(401).json({
      error: true,
      mensaje: "Unauthorized",
    })
  } catch (error) {
    logger.error(error)
    res.status(500).json({
      error: true,
      mensaje: "Internal Server Error",
    })
  }
}

exports.login = login
