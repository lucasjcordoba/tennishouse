'use strict';
module.exports = (sequelize, Sequelize) => {
  const Direccion = sequelize.define('Direccion', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    calle: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    numero: {
        type: Sequelize.INTEGER(10),
        allowNull: false
        },
    cod_postal: {
        type: Sequelize.INTEGER(10),
        allowNull: false
        },
    provincia: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    telefono: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
  }, {
    tablename: 'Direcciones',
    timestamps: true
  });
  Direccion.associate = function(models){
    Direccion.hasMany(models.Usuario,{
      as: 'usuario',
      foreignKey: 'direccion_id'
  });
  };
  return Direccion;
};