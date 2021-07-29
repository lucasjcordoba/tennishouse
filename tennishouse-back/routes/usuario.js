var express = require('express');
var router = express.Router();
//let path = require('path');
//let multer = require('multer');
var usuarioController = require('../controllers/usuarioController')
let { check, validationResult, body} = require('express-validator');

/* Por si quiero agregar funcionalidad modificar avatar
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/avatars')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  });
   
var upload = multer({ storage: storage });
*/

// router.get('/perfil', usuarioController.perfil);
// router.get('/login', usuarioController.loginForm);


router.post('/registrarse', 
check('email').isEmail(),
check('contraseña').isLength({min:6}),
usuarioController.crear);

router.post('/login', 
check('email').isEmail(),
check('contraseña').isLength({min:6}),
usuarioController.login);

// LOGOUT EN EL FRONT
// router.post('/logout', usuarioController.logout);

module.exports = router;
