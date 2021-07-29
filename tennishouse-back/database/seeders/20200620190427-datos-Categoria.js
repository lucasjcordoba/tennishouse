'use strict';

let faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    var categorias = [];
    for(let i = 0; i < 10; i++){
      categorias.push({
        nombre: faker.commerce.department(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent()
      });
    }
    return queryInterface.bulkInsert('Categorias', categorias, {});
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

