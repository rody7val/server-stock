const Item = require('../models/item')

// GET
exports.findAll = (req, res) => {
  Item.find((err, items) => {
    if (err) {
      return res.status(200).json({
        success: false, 
        error: {
          errors: { items: { message: "Ningun item" } },
          message: err.message
        }
      })
    }
    res.status(200)
      .json({ success: true, items: items })
  })
}

// GET
exports.findById = (req, res) => {
  Item.findById(req.params.id, (err, item) => {
    if (err) {
      return res.status(200).json({
        success: false, 
        error: {
          errors: { item: { message: "No existe éste item" } },
          message: err.message
        }
      })
    }
    res.status(200)
      .json({ success: true, item: item })
  })
}

// POST
exports.add = (req, res) => {
  let item = new Item({
    name: req.body.name,
    price: req.body.price,
    qty: req.body.qty,
    desc: req.body.desc,
    category: req.body.category,
    img: req.body.img
  })

  item.save((err, item) => {
    if (err) {
      return res.status(200).json({
        success: false, 
        error: {
          errors: { item: { message: "No se pudo crear" } },
          message: err.message
        }
      })
    }
    res.status(200)
      .json({ success: true, item: item })
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
      return res.status(200).json({
        success: false, 
        error: {
          errors: { item: { message: "No se pudo guardar los cambios" } },
          message: err.message
        }
      })
    }
    res.status(200)
      .json({ success: true, item: item })
  });
};

// DELETE
exports.delete = (req, res) => {
  Item.findById(req.params.id, (err, item) => {
    item.remove(err => {
    if (err) {
      return res.status(200).json({
        success: false, 
        error: {
          errors: { item: { message: "No se pudo borrar" } },
          message: err.message
        }
      })
    }
      res.status(200)
        .json({ success: true })
    })
  })
}