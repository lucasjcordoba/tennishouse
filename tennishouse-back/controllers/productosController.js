let fs = require('fs');
let path = require('path');
var pathJSON = path.dirname(__dirname) + '/data/productsDataBase.json';
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
let productos = JSON.parse(fs.readFileSync(pathJSON, 'utf-8'));
const db = require('../database/models');
let { check, validationResult, body} = require('express-validator');

const URI = 'http://localhost:3000';

var productosController = {
  lista: async (req, res, next) => {
    let where = {};
    let offset = req.query.start ? Number(req.query.start) : 0
    let limit = 10;
    let start = 10;
    if(req.query.start){
      start = req.query.start
    }
    if(req.query.categoria){
        where = {
        categoria_id: req.query.categoria
        }
    }
    
    let total = await db.Producto.count({where})

    console.log(`start: ${start} total-offset: ${total-offset}`)
    db.Producto.findAll({
      offset: offset,
      where,
      limit: limit,
      include: [{ association: 'categoria' }, { association: 'marca' }],

    })
      .then(results => {
        for (result of results) {
          result.setDataValue("endpoint", URI + "/productos/" + result.id);
        }
        console.log(results.length)
        let response = {
          meta: {
            status: 200,
            total: results.length,
            url: URI + "/productos/"
          },
          data: results,
          pagination: {
            next_page: total-offset > limit ? `?start=${start}` : null,
            prev_page: "?start=0"
          }
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
  listaTop: (req, res, next) => {
    db.Producto.findAll({
      limit: 9,
      order: [
        ['rating', 'DESC']
      ],
      include: [{ association: 'categoria' }, { association: 'marca' }]
    })
      .then(results => {
        for (result of results) {
          result.setDataValue("endpoint", URI + "/productos/" + result.id);
        }
        let response = {
          meta: {
            status: 200,
            total: results.length,
            url: URI + "/productos/"
          },
          data: results,
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
  listaNew: (req, res, next) => {
    db.Producto.findAll({
      limit: 9,
      order: [
        ['createdAt', 'DESC']
      ],
      include: [{ association: 'categoria' }, { association: 'marca' }]
    })
      .then(results => {
        for (result of results) {
          result.setDataValue("endpoint", URI + "/productos/" + result.id);
        }
        let response = {
          meta: {
            status: 200,
            total: results.length,
            url: URI + "/productos/"
          },
          data: results,
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
  detalle: function (req, res, next) {
    db.Producto.findByPk(req.params.id, {
      include: [{ association: 'categoria' }, { association: 'marca' }, {association: 'atributos'}]
    })
      .then(result => {
        let response = {
          meta: {
            status: 404,
            message: 'ID not found'
          }
        }
        if (result) {
          response = {
            meta: {
              status: 200,
              url: URI + "/productos/" + result.id
            },
            data: result
          }
        }
        res.json(response);
      })
      .catch(error => {
        console.log('Error: ' + error)
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
    
    let errors = validationResult(req);
    errors.isEmpty()

    if (errors.isEmpty()) {

    db.Producto.create({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      imagen: `http://localhost:3000/images/productos/${req.files[0].filename}`,
      precio: req.body.precio,
      rating: req.body.rating,
      categoria_id: req.body.categoria_id,
      marca_id: req.body.marca_id
    })
      .then(result => {
        db.Producto.findByPk(result.dataValues.id)
          .then(producto => {
            //Estoy recibiendo un ARRAY de atributos a traves de lista checkbox input
            producto.addAtributo(JSON.parse(req.body.atributos))
          })
      })
      .then(result => {
        let response = {
          meta: {
            status: 200,
            message: 'Product created succesfully',
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
  } else {

    let response = {
      meta: {
        status: 422,
        error: "Invalid data"
      }
    }
    res.json(response)
  }

  },
  editado: async (req, res, next) => {

    let errors = validationResult(req);
    errors.isEmpty()

    console.log('ATRIBUTOS :' ,JSON.parse(req.body.atributos))

    if (errors.isEmpty()) {

    try {
      let producto = await db.Producto.findByPk(req.params.id, {
        include: [{ association: 'atributos' }]
      })

      db.sequelize.query(`DELETE FROM Producto_Atributo WHERE producto_id = ${req.params.id}`, { type: db.Sequelize.QueryTypes.DELETE })
        .then(() => {
          producto.addAtributo(JSON.parse(req.body.atributos))
        })

      let updateProducto = await db.Producto.update({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        imagen: `http://localhost:3000/images/productos/${req.files[0].filename}`,
        precio: req.body.precio,
        rating: req.body.rating,
        categoria_id: req.body.categoria_id,
        marca_id: req.body.marca_id
      }, {
        where: {
          id: req.params.id
        }
      })

      let response = {
        meta: {
          status: 200,
          message: 'Product edited succesfully'
        }
      }
      res.json(response)

    } catch (e) {
      let response = {
        meta: {
          status: 422,
          error: "Invalid data"
        }
      }
      res.json(response)
    }
  } else {

    let response = {
      meta: {
        status: 422,
        error: "Invalid data"
      }
    }
    res.json(response)
  }

  },
  eliminar: async (req, res, next) => {
    let response;
    try {
      const destroyPivot = await db.sequelize.query(`DELETE FROM Producto_Atributo WHERE producto_id = ${req.params.id}`, { type: db.Sequelize.QueryTypes.DELETE })

      const destroyProducto = await db.Producto.destroy({
        where: {
          id: req.params.id
        }
      })

      response = {
        meta: {
          status: 200,
          message: 'Product deleted successfully'
        }
      }
      res.json(response)
    }
    catch (e) {
      response = {
        meta: {
          status: 422,
          error: "Invalid data"
        }
      }
      res.json(response)
    }

  },
  listaCategorias: (req, res, next) => {
    db.Categoria.findAll({
      limit: 5
    })
      .then(results => {

        let response = {
          meta: {
            status: 200,
            total: results.length,
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
  listaMarcas: (req, res, next) => {
    db.Marca.findAll({
      limit: 10
    })
      .then(results => {

        let response = {
          meta: {
            status: 200,
            total: results.length,
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
  listaAtributos: (req, res, next) => {
    db.Atributo.findAll({
      limit: 5,
      order: [
        ['nombre', 'ASC']
        
      ],
      group: 'nombre'
    })
      .then(results => {

        let response = {
          meta: {
            status: 200,
            total: results.length,
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

  }
}

module.exports = productosController;