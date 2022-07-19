/**
 * Configuracion de app
 * **/
process.env.NODE_ENV = process.env.NODE_ENV || "desarrollo"
process.env.PORT = process.env.PORT || 2000

/**
 * Configuracion de db
 * **/
const user = process.env.USER_DB || "etpnsowyedjpcl"
const host = process.env.HOST_DB || "ec2-52-206-182-219.compute-1.amazonaws.com"
const database = process.env.DATABASE || "daaop4ap5m8cbb"
const password = process.env.PASSWORD_DB || "71f9fd7d4a9c4f2122f38d3e211dc7b8bcf782ba3c2ecbbe7350f8a5d79c5566"
const port = process.env.PORT_DB || "5432"

const conexiondb = {
  user,
  host,
  database,
  password,
  port,     
}

exports.conexiondb = conexiondb
