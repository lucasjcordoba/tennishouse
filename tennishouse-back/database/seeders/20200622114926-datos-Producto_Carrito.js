'use strict';
let faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    const carritos = await queryInterface.sequelize.query('SELECT id FROM Carritos;', { type: Sequelize.QueryTypes.SELECT });
    const productos = await queryInterface.sequelize.query('SELECT id FROM Productos;', { type: Sequelize.QueryTypes.SELECT });
    var producto_carrito = [];

    for(let i = 0; i < 200; i++){
      producto_carrito.push({
        cantidad: faker.random.number(10),
        carrito_id: faker.random.arrayElement(carritos).id,
        producto_id: faker.random.arrayElement(productos).id,
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent()
      });
    }
    await queryInterface.bulkInsert('Producto_Carrito', producto_carrito, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
