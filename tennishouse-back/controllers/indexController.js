let fs = require('fs');
let path = require('path');



var indexController = {
    index: function(req, res, next) {

      console.log(currentDate);
        res.render('index');
      }
}

module.exports = indexController