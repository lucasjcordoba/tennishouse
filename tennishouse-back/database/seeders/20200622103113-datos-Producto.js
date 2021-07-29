'use strict';
let faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const categorias = await queryInterface.sequelize.query('SELECT id FROM Categorias;', { type: Sequelize.QueryTypes.SELECT });
    const marcas = await queryInterface.sequelize.query('SELECT id FROM Marcas;', { type: Sequelize.QueryTypes.SELECT });

    var productos = [];

    for(let i = 0; i < 100; i++){
      productos.push({
        nombre: faker.company.companyName(),
        descripcion: faker.lorem.words(30),
        imagen: faker.image.sports(),
        precio: faker.random.number(20000),
        rating: faker.random.number(10),
        categoria_id: faker.random.arrayElement(categorias).id,
        marca_id: faker.random.arrayElement(marcas).id,
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent()
      });

    }
    await queryInterface.bulkInsert('Productos', productos, {});
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
