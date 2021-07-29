'use strict';
let faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const usuarios = await queryInterface.sequelize.query('SELECT id FROM Usuarios;', { type: Sequelize.QueryTypes.SELECT });
    var carritos = [];

    for(let i = 0; i < 50; i++){
      carritos.push({
        fecha_compra: faker.date.recent(),
        total: faker.random.number(100000),
        usuario_id: faker.random.arrayElement(usuarios).id,
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent()
      });
    }
    await queryInterface.bulkInsert('Carritos', carritos, {});
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
