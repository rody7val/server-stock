const ip = require("ip")
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const db = require('mongoose')
const app = express()
const api = require('./api')(express.Router())
const port = process.env.PORT || 3000
const host = process.env.MONGO_URL || 'localhost'

app.use(cors())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(methodOverride())
app.use('/', api)
db.connect(`mongodb://${host}/stock`, (err, res) => {
  if (err) {
    console.error(`ERROR: connecting to Database. ${err}`)
  }
  app.listen(port, () => {
    console.log(`Node server running on http://${ip.address()}:${port}`)
  })
})