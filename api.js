const itemsCtrl = require('./controllers/items')

module.exports = (router) => {

	router.get('/', (req, res) => { res.send('API REST') })

  router.route('/api/items')
   .get(itemsCtrl.findAll)
   .post(itemsCtrl.add)

  router.route('/api/items/:id')
    .get(itemsCtrl.findById)
    .put(itemsCtrl.update)
    .delete(itemsCtrl.delete)

  return router
}