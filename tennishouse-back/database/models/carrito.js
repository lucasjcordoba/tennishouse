'use strict';
module.exports = (sequelize, Sequelize) => {
  const Carrito = sequelize.define('Carrito', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    fecha_compra: {
      type: Sequelize.DATE(),
      allowNull: false
    },
    total: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
    }
  }, {
    tablename: 'Carritos',
    timestamps: true
  });
  Carrito.associate = function(models) {
    Carrito.belongsToMany(models.Producto, {
      as: 'productos',
      through: 'Producto_Carrito',
      foreignKey: 'carrito_id',
      otherkey: 'producto_id',
      timestamps: true
  });
  Carrito.belongsTo(models.Usuario, {
      as: 'usuario',
      foreignKey: 'usuario_id'
  });
  };
  return Carrito;
};