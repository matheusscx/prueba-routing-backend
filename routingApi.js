require('./config/config')
const express = require('express')
const path = require('path')
const app = express()
const db = require('./db/index')
const cors = require('cors')
const { errorHandler } = require('./middleware/errorHandler')
const { notFoundHandler } = require('./middleware/notFoundHandler')
const middlewares = require('./middleware/middlewares')

//Globales
logger = require('./libs/logger')

// middleware
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false, limit: '50mb' }))

// parse application/json
app.use(express.json({ extended: false, limit: '50mb' }))

// habilitar carpeta public
app.use(express.static(path.resolve(__dirname, './public')))


// Middleware para agregar nuevo token a respuesta
app.use(middlewares.addJwtRespuesta)

// Configuración de rutas
app.use('/api', require('./routes'))

app.use(errorHandler)
app.use(notFoundHandler)

// Start server
app.listen(process.env.PORT, async () => {
  logger.info(`Servidor corriendo en puerto: ${process.env.PORT}`)
  try {
    await db.query('select true')
    logger.info('Conexion db OK!!!')
  } catch (e) {
    logger.error(e)
  }
})
