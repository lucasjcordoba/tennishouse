'use strict';
let faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const productos = await queryInterface.sequelize.query('SELECT id FROM Productos;', { type: Sequelize.QueryTypes.SELECT });
    const atributos = await queryInterface.sequelize.query('SELECT id FROM Atributos;', { type: Sequelize.QueryTypes.SELECT });
    var producto_atributo = [];

    for(let i = 0; i < 500; i++){
      producto_atributo.push({
        producto_id: faker.random.arrayElement(productos).id,
        atributo_id: faker.random.arrayElement(atributos).id,
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent()
      });
    }
    await queryInterface.bulkInsert('Producto_Atributo', producto_atributo, {});
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
