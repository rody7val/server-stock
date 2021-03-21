const service = require('../services')
const User = require('../models/user')

// POST
exports.emailSignup = (req, res) => {
  const user = new User(req.body)

  user.save((err) =>{
    if (err) {
      return res.status(200)
        .json({ success: false, error: err})
    }
    res.status(200)
      .json({
        success: true,
        user: user,
        token: service.createToken(user)
      })
  })
}

// POST
exports.emailLogin = (req, res) => {
  User.findOne({email: req.body.email.toLowerCase()}, (err, user) => {
    if (err) {
      return res.status(200).json({
        success: false, 
        error: {
          errors: { server: { message: err.message } },
          message: err.message
        }
      })
    }
    else if (!user) {// email incorrecto
      return res.status(200).json({
        success: false, 
        error: {
          errors: { email: { message: "Email incorrecto" } },
          message: "Email incorrecto"
        }
      })
    }
    else if (user.comparePassword(req.body.password, user.password)) {// Acceso al token
      return res.status(200)
        .json({
          success: true,
          user: user,
          token: service.createToken(user)
        })
    }
    // Contraseña incorrecta
    res.status(200).json({
      success: false, 
      error: {
        errors: { password: { message: "Contraseña incorrecta" } },
        message: "Contraseña incorrecta"
      }
    })
  })
}

// GET
exports.findById = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return res.status(200).json({
        success: false, 
        error: {
          errors: { user: { message: "No existe éste usuario" } },
          message: err.message
        }
      })
    }
    res.status(200)
      .json({ success: true, user: user })
  })
}