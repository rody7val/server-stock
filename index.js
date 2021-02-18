const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const db = require('mongoose')
const app = express()
const api = require('./api')(express.Router())

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride())
app.use('/', api)

db.connect('mongodb://localhost/stock', (err, res) => {
  if (err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3000, () => {
    console.log('Node server running on http://localhost:3000')
  })
})