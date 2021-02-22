const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('./config')

exports.createToken = (user) => {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, "days").unix(),
  }
  return jwt.encode(payload, config.TOKEN_SECRET)
}

exports.ensureAuthenticated = (req, res, next) => {
  if(!req.headers.authorization) {
    return res.status(200)
      .json({
        success: false, 
        error: {
          errors: { 
            token: { message: "Tu petición no tiene cabecera de autorización" }
          }
        }
      })
  }
  
  const token = req.headers.authorization.split(" ")[1]
  const payload = jwt.decode(token, config.TOKEN_SECRET)
  
  if(payload.exp <= moment().unix()) {
    return res.status(200)
      .json({
        success: false, 
        error: {
          errors: { 
            token: { message: "El token ha expirado" }
          }
        }
      })
  }
  
  req.user = payload.sub
  next()
}