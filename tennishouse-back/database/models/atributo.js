'use strict';
module.exports = (sequelize, Sequelize) => {
  const Atributo = sequelize.define('Atributo', {
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
    tablename: 'Atributos',
    timestamps: true
  });
  Atributo.associate = function(models) {
    Atributo.belongsToMany(models.Producto, {
      as: 'productos',
      through: 'Producto_Atributo',
      foreignKey: 'atributo_id',
      otherKey: 'producto_id',
      timestamps: true
  });
  };
  return Atributo;
};