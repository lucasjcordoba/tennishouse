'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Productos', {
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
          allowNull: false,
          references: {
            model: {
              tableName: 'Categorias'
              },
              key: 'id'
            }
          },
      marca_id : {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: 'Marcas'
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
    return queryInterface.dropTable('Productos');
  }
};