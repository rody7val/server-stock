const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const deepPopulate = require('mongoose-deep-populate')(mongoose)
const bcrypt = require('bcrypt-nodejs')
const Schema = mongoose.Schema

const User = new Schema({
  email: {
    type: String,
    required: true,
    index: { unique: true },
    validate: [ email => {
      return !(!email.match(/.+\@.+\..+/))
    }, 'El Email es incorrecto']
  },
  username: {
    type: String,
    required: true,
    index: { unique: true },
    validate: [ name => {
      return name.length > 0
    }, 'Ingresar un nombre de usuario']
  },
  password: {
    type: String,
    required: true,
    validate: [password => {
      return password.length >= 6
    }, 'La Contraseña debe tener seis o mas caracteres']
  },
  name: {
    type: String,
    index: true
  },
  admin: {
    type: Boolean,
    index: true,
    default: false
  },
  active: {
    type: Boolean,
    index: true,
    default: false
  },
  img: String,
  created: {
    type: Number,
    default: Date.now
  }
})

User.pre('save', function (next) {
  if (!this.isModified('password')) return next()
  bcrypt.hash(this.password, null, null, (err, hash) => {
    if (err) return next(err)
    this.password = hash
    next()
  })
})

User.methods.comparePassword = function (password, hash) {
  return bcrypt.compareSync(password, hash)
}

User.plugin(uniqueValidator, { message: '{VALUE} ya existe' })
User.plugin(deepPopulate)

module.exports = mongoose.model('User', User)