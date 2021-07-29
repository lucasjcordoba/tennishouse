'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Usuarios', {
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
      direccion_id : {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: {
              tableName: 'Direcciones'
              },
              key: 'id'
            }
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
    return queryInterface.dropTable('Usuarios');
  }
};