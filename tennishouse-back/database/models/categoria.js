'use strict';
module.exports = (sequelize, Sequelize) => {
  const Categoria = sequelize.define('Categoria', {
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
    tableName: 'Categorias',
    timestamps: true,
  });

  Categoria.associate = function(models) {

    Categoria.hasMany(models.Producto, {
      as: 'productos',
      foreignKey: 'categoria_id'
  });
  
  };
  return Categoria;
};