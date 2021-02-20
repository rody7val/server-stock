const mongoose = require('mongoose')
const service = require('../services')
const User = require('../models/user')

exports.emailSignup = (req, res) => {
  var user = new User({
	  name: req.body.name,
	  email: req.body.email,
	  img: req.body.img,
	  admin: req.body.admin
	})
    
  user.save((err) =>{
    if (err) {
      return res.status(500)
        .json({ success: false, error: err.message })
    }
    res.status(200)
      .json({success: true, token: service.createToken(user)})
  })
}

exports.emailLogin = (req, res) => {
  User.findOne({email: req.body.email.toLowerCase()}, (err, user) => {
    if (err) {
      return res.status(500)
        .json({ success: false, error: err.message })
    }
    return res
      .status(200)
      .json({success: true, token: service.createToken(user)})
  })
}