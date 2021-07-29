const db = require("../database/models");

const URI = 'http://localhost:3000';


var carritoController = {

  lista: (req, res, next) => {
    console.log(req.query)
    db.Carrito.findAll({
      where: {
        usuario_id: req.query.userId
      }
    })
      .then(results => {
        console.log(results)
        let response = {
          meta: {
            status: 200,
            total: results.length,
            url: URI + "/carritos/"
          },
          data: results
        }
        res.json(response);
      })
      .catch(error => {
        let response = {
          meta: {
            status: 404,
            error: error.message
          }
        }
        res.json(response)
      })

  },
  crear: (req, res, next) => {
    db.Carrito.create({
      fecha_compra: req.body.fecha_compra,
      total: req.body.total,
      usuario_id: req.body.usuario_id
    })
      .then(result => {
        let response = {
          meta: {
            status: 200,
            message: 'Cart created succesfully',
            data: result
          }
        }
        res.json(response);
      })
      .catch(error => {
        let response = {
          meta: {
            status: 422,
            error: "Invalid data"
          }
        }
        res.json(response)
      })
  }
}

module.exports = carritoController;