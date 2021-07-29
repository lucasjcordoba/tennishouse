'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Producto_Carrito', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cantidad: {
        type: Sequelize.INTEGER(10),
        allowNull: false
      },
      carrito_id : {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: 'Carritos'
              },
              key: 'id'
            }
      },
      producto_id : {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: 'Productos'
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
    return queryInterface.dropTable('Producto_Carrito');
  }
};