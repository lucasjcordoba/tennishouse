var express = require('express');
var router = express.Router();
let multer = require('multer');
let path = require('path');
var productosController = require ('../controllers/productosController');
let { check, validationResult, body} = require('express-validator');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/productos')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  });
   
var upload = multer({ storage: storage });

//router.get('/', productosController.lista );
router.get('/', productosController.lista);
router.get('/top', productosController.listaTop);
router.get('/new', productosController.listaNew);
//LISTA CATEGORIAS Y MARCAS
router.get('/listaCategorias', productosController.listaCategorias);
router.get('/listaMarcas', productosController.listaMarcas);
router.get('/listaAtributos', productosController.listaAtributos);


//PONER ULTIMO el get con :id ultimo para que no pise los anteriores
router.get('/:id', productosController.detalle);



router.post('/crearProducto', upload.any(),

  check('nombre').isLength({max:500}),
  check('descripcion').isLength({max:1000}),
  check('precio').isDecimal(),
  check('rating').isDecimal(),
  check('marca_id').isInt(),
  check('categoria_id').isInt(),
  check('imagen').isLength({max:500}),

productosController.crear);

router.put('/:id/editar', upload.any(),

  check('nombre').isLength({max:500}),
  check('descripcion').isLength({max:1000}),
  check('precio').isDecimal(),
  check('rating').isDecimal(),
  check('marca_id').isInt(),
  check('categoria_id').isInt(),
  check('imagen').isLength({max:500}),
  
  productosController.editado);

router.delete('/:id/eliminar', productosController.eliminar);

module.exports = router;