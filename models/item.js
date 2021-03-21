const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Item = new Schema({
  name: String,
  price: Number,
  qty: Number,
  desc: String,
  category: String,
  img: String,
  created: { type: Number, default: Date.now }
})

module.exports = mongoose.model('Item', Item)