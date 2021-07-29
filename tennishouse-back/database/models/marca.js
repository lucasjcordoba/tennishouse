'use strict';
module.exports = (sequelize, Sequelize) => {
  const Marca = sequelize.define('Marca', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    nombre: {
      type: Sequelize.STRING(100),
      allowNull: false
    }
  }, {
    tablename: 'Marcas',
    timestamps: true
  });
  Marca.associate = function(models) {
    Marca.hasMany(models.Producto, {
      as: 'productos',
      foreignKey: 'marca_id'
    });
  };
  return Marca;
};