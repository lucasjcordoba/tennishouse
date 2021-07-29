'use strict';
let faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const direcciones = await queryInterface.sequelize.query('SELECT id FROM Direcciones;', { type: Sequelize.QueryTypes.SELECT });
    var usuarios = [];

    for(let i = 0; i < 30; i++){
      usuarios.push({
        email: faker.internet.exampleEmail(),
        contraseña: faker.internet.password(8),
        direccion_id: faker.random.arrayElement(direcciones).id,
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent()
      });
    }
    await queryInterface.bulkInsert('Usuarios', usuarios, {});
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
