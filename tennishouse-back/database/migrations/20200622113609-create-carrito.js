'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Carritos', {
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
      },
      usuario_id : {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: 'Usuarios'
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
    return queryInterface.dropTable('Carritos');
  }
};