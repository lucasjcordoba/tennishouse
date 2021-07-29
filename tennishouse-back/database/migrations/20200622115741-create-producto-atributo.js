'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Producto_Atributo', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      atributo_id : {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: 'Atributos'
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
    return queryInterface.dropTable('Producto_Atributo');
  }
};