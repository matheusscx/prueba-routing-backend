const jwt = require("jsonwebtoken");


const validarToken = (req, res, next) => {
  let token = req.get("Authorization")
    ? req.get("Authorization").split(" ")
    : null;

  if (token && token.length) {
    token = token[1];
  }

  jwt.verify(token, process.env.SEED_TOKEN, (err, decoded) => {
    if (err) {
      res.status(401).json({
        error: true,
        mensaje: err,
      });
    } else {
      let { id_usuario, id_cliente, permiso } = decoded;
      const newJwt = jwt.sign(decoded, process.env.SEED_TOKEN, {
        expiresIn: process.env.EXPIRATION_TOKEN,
      });
      req.user = { id_usuario, id_cliente, permiso, token, newJwt };
      next();
    }
  });
};

const addJwtRespuesta = (req, res, next) => {
  res.jsonWt = (response) => {
    res.json({
      respuesta: response,
      newJwt: req.user.newJwt,
    });
  };
  next();
};


exports.validarToken = validarToken 
exports.addJwtRespuesta = addJwtRespuesta
