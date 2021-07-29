var express = require('express');
var router = express.Router();
var carritoController = require ('../controllers/carritoController')
let { check, validationResult, body} = require('express-validator');


router.get('/', carritoController.lista);
router.post('/crear', carritoController.crear);

module.exports = router