const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const db = require('mongoose')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride())

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hi')
})

app.use(router)

db.connect('mongodb://localhost/stock', (err, res) => {
  if (err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3000, () => {
    console.log('Node server running on http://localhost:3000')
  })
})