'use strict';
let faker = require('faker');


module.exports = {
  up: (queryInterface, Sequelize) => {
    var direcciones = [];
    for(let i = 0; i < 30; i++){
      direcciones.push({
        calle: faker.address.streetName(),
        numero: faker.random.number(10000),
        cod_postal: faker.random.number(10000),
        provincia: faker.address.state(),
        telefono: faker.phone.phoneNumber(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent()
      });
    }
    return queryInterface.bulkInsert('Direcciones', direcciones, {});
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
