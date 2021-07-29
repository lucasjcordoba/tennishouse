'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Direcciones', {
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
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Direcciones');
  }
};