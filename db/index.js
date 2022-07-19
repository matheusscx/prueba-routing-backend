const { conexiondb } = require("../config/config")

const { Pool } = require("pg")
let pool = new Pool({... conexiondb, ssl: {rejectUnauthorized: false}, idleTimeoutMillis: 0,})

async function query(query) {
  return new Promise((resolve, reject) => {
    const start = Date.now()
    pool.query(query, (err, res) => {
      const duration = Date.now() - start
      if (err) {
        logger.error(`*ERROR: Duración: ${duration}, Query: ${query}`)
        reject(err)
      } else {
        if (process.env.NODE_ENV !== "produccion") {
          logger.info(`* Se ejecuta query. Duración: ${duration}  Registros: ${res.rowCount} Query: ${query}`)
        }
        resolve(res.rows)
      }
    })
  })
}

async function getClient() {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) {
        reject(err)
      } else {
        // "done" cb para cerrar la conexion con el cliente a terminar las consultas.
        resolve({ client, done })
      }
    })
  })
}

exports.query = query
exports.getClient = getClient
