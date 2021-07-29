'use strict';
module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    contraseña: {
        type: Sequelize.STRING(1000),
        allowNull: false
    },
    direccion_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: 'Direcciones'
          },
          key: 'id'
        }
    }
  }, {
    tablename: 'Usuarios',
    timestamps: true
  });
  Usuario.associate = function(models) {
    Usuario.belongsTo(models.Direccion, {
      as: 'direccion',
      foreignKey: 'direccion_id'
    });
    Usuario.hasMany(models.Carrito, {
      as: 'carritos',
      foreignKey: 'usuario_id'
    });
  };
  return Usuario;
};