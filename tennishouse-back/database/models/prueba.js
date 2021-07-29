'use strict';
module.exports = (sequelize, DataTypes) => {
  const Prueba = sequelize.define('Prueba', {
    nombre: DataTypes.STRING
  }, {});
  Prueba.associate = function(models) {
    // associations can be defined here
  };
  return Prueba;
};