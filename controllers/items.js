const Item = require('../models/item')

// GET
exports.findAll = (req, res) => {
  Item.find((err, items) => {
    if (err) {
      return res.status(500)
        .json({ success: false, data: err.message })
    }
    res.status(200)
      .json({ success: true, data: items })
  })
}

// GET
exports.findById = (req, res) => {
  Item.findById(req.params.id, (err, item) => {
    if (err) {
      return res.status(500)
        .json({ success: false, data: err.message })
    }
    res.status(200)
      .json({ success: true, data: item })
  })
}

// POST
exports.add = (req, res) => {
  var item = new Item({
    name: req.body.name,
    price: req.body.price,
    qty: req.body.qty,
    img: req.body.img,
    desc: req.body.desc,
    category: req.body.category
  })

  item.save((err, item) => {
    if (err) {
      return res.status(500)
        .json({ success: false, data: err.message })
    }
    res.status(200)
      .json({ success: true, data: item })
  })
}

// PUT
exports.update = (req, res) => {
  Item.findById(req.params.id, (err, item) => {
    item.name = req.body.name
    item.price = req.body.price
    item.qty = req.body.qty
    item.img = req.body.img
    item.desc = req.body.desc
    item.category = req.body.category
  })

  item.save((err, item) => {
    if (err) {
      return res.status(500)
        .json({ success: false, data: err.message })
    }
    res.status(200)
      .json({ success: true, data: item })
  });
};

// DELETE
exports.delete = (req, res) => {
  Item.findById(req.params.id, (err, item) => {
    item.remove(err => {
      if (err) {
        return res.status(500)
          .json({ success: false, data: err.message })
      }
      res.status(200)
        .json({ success: true })
    })
  })
}