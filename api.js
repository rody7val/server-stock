const authCtrl = require('./controllers/auth')
const itemsCtrl = require('./controllers/items')
const services = require('./services');

module.exports = (router) => {

  router.get('/', (req, res) => { res.send('API REST') })

  router.post('/api/signup', authCtrl.emailSignup)
  router.post('/api/login', authCtrl.emailLogin)

  router.get('/api/items', itemsCtrl.findAll)
  router.post('/api/items', services.ensureAuthenticated, itemsCtrl.add)
  
  router.get('/api/items/:id', itemsCtrl.findById)
  router.put('/api/items/:id', services.ensureAuthenticated, itemsCtrl.update)
  router.delete('/api/items/:id', services.ensureAuthenticated, itemsCtrl.delete)

  return router
}