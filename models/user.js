const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  name: String,
  email: String,
  img: Number,
  admin: Boolean,
  created: { type: Number, default: Date.now }
})

module.exports = mongoose.model('User', User)