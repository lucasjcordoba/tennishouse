'use strict';
module.exports = (sequelize, Sequelize) => {
  const Producto = sequelize.define('Producto', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    nombre: {
      type: Sequelize.STRING(500),
      allowNull: false
    },
    descripcion: {
        type: Sequelize.STRING(1000),
        allowNull: false
    },
    imagen: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    precio: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
    },
    rating: {
        type: Sequelize.DECIMAL(3,1),
        allowNull: false
    },
    categoria_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    marca_id : {
      type: Sequelize.INTEGER,
      allowNull: false
    }

  }, {
    tablename: 'Productos',
    timestamps: true
  });

  Producto.associate = function(models) {

    Producto.belongsTo(models.Categoria, {
      as: 'categoria',
      foreignKey: 'categoria_id'
    });
    Producto.belongsTo(models.Marca, {
        as: 'marca',
        foreignKey: 'marca_id'
    });
    Producto.belongsToMany(models.Atributo, {
        as: 'atributos',
        through: 'Producto_Atributo',
        foreignKey: 'producto_id',
        otherkey: 'atributo_id',
        timestamps: true
    });
    Producto.belongsToMany(models.Carrito, {
        as: 'carritos',
        through: 'Producto_Carrito',
        foreignKey: 'producto_id',
        otherkey: 'carrito_id',
        timestamps: true
    });
  };
  return Producto;
};