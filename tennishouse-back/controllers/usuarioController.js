let fs = require('fs');
let path = require('path');
let bcrypt = require('bcrypt');
// var pathJSON = path.dirname(__dirname) + '/data/usersDataBase.json';
// let usuarios = JSON.parse(fs.readFileSync(pathJSON, 'utf-8'));
const db = require('../database/models');
let { check, validationResult, body} = require('express-validator');

var usuarioController = {
  // perfil: function(req, res, next) {
  //     if(req.session.usuarioLogueado == undefined){
  //       res.send('No estas logueado');
  //     }
  //     res.render('perfil', {title: 'Tu perfil', usuario: req.session.usuarioLogueado});
  //   },
  // loginForm: function(req, res, next) {
  //   console.log(req.session.usuarioLogueado);
  //   if(req.session.usuarioLogueado != undefined){
  //     res.redirect('../usuario/perfil');
  //   }
  //   res.render('login', {title: 'Log In'});
  // },
  crear: async function (req, res, next) {

    let errors = validationResult(req);
    console.log('Errores: ', errors)
    console.log('Body: ', req.body)

    if (errors.isEmpty()) {

    let response;
    console.log('Body: ', req.body)
    try {
      let exists = await db.Usuario.findOne({
        where: { email: req.body.email }
      })
      if (exists) {
        response = {
          meta: {
            status: 422,
            message: 'Email already exists'
          }
          
        }
        res.json(response)
      } else {
        let usuario = await db.Usuario.create({
          email: req.body.email,
          contraseña: bcrypt.hashSync(req.body.contraseña, 10)
        })
        response = {
          meta: {
            status: 200,
            message: 'User created successfully'
          },
          data: {
            id: usuario.dataValues.id,
            email: usuario.dataValues.email
          }
        }
        res.json(response)
      }
    } catch (e) {
      console.log(e)
      response = {
        meta: {
          status: 500,
          message: "Invalid data"
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

  login: async function (req, res, next) {

    let errors = validationResult(req);
    errors.isEmpty()

    if (errors.isEmpty()) {
      console.log(errors);
    let response;
    try {
      let exists = await db.Usuario.findOne({
        where: { email: req.body.email }
      })
      if (!exists) {
        response = {
          meta: {
            status: 422,
            message: "Email doesn't exist"
          }
        }
        res.json(response)
      } else {
        response = {
          meta: {
            status: 200,
            message: 'Login successfull'
          },
          data: {
            id: exists.dataValues.id,
            email: exists.dataValues.email
          }
        }
      
        if (!bcrypt.compareSync(req.body.contraseña, exists.contraseña)) {
          response = {
            meta: {
              status: 401,
              message: 'Wrong Password'
            }
          }
        }
        console.log(exists.dataValues)
        res.json(response)
      }
    } catch (e) {
      console.log(e)
      response = {
        meta: {
          status: 422,
          message: "Wrong Password"
        }
      }
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
  //LOGOUT EN EL FRONT
  // logout: function (req, res, next) {
  //   req.session.usuarioLogueado = undefined;
  //   res.clearCookie('usuario');
  //   res.redirect('../usuario/login');
  // }

}

module.exports = usuarioController