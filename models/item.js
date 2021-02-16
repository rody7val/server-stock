const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Item = new Schema({
  name: String,
  price: Number,
  qty: Number,
  img: Number,
  desc: String,
  category: String,
  created: { type: Number, default: Date.now }
})

module.exports = mongoose.model('Item', Item)