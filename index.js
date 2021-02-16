const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const db = require('mongoose')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride())

const routerHome = express.Router()
const routerApi = express.Router()
const itemsCtrl = require('./controllers/items');

// Home Documentation
routerHome.get('/', (req, res) => {
  res.send('Hi')
})

// API REST
routerApi.route('/items')
 .get(itemsCtrl.findAll)
 .post(itemsCtrl.add)
routerApi.route('/items/:id')
  .get(itemsCtrl.findById)
  .put(itemsCtrl.update)
  .delete(itemsCtrl.delete)

app.use('/', routerHome)
app.use('/api', routerApi);

db.connect('mongodb://localhost/stock', (err, res) => {
  if (err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3000, () => {
    console.log('Node server running on http://localhost:3000')
  })
})