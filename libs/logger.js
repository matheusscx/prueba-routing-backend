const {createLogger, format, transports} = require('winston')
const path = require('path')

let ruta = path.resolve(__dirname, '../logs')

let nombreArchivo = 'NOMBRE_APP_DE_CONFIG'
let fecha = '2020-09-02'

module.exports = createLogger({
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf(info => `[${info.timestamp}][${info.level}] ${info.message}`)
  ),
  transports : [
    new  transports.File({
      maxsize: 5120000, // peso archivo log
      maxFiles:30, // Maximo 30 archivos antes de empezar a borrar el ultimo
      filename : `${ruta}/${fecha}_${nombreArchivo}.log`
    }),
    new  transports.Console({
      level: 'debug'
    })
  ]
})


