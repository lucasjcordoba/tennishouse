'use strict';
let faker = require('faker');


module.exports = {
  up: (queryInterface, Sequelize) => {
    var atributos = [];
    for(let i = 0; i < 5; i++){
      atributos.push({
        nombre: faker.commerce.productAdjective(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent()
      });
    }
    return queryInterface.bulkInsert('Atributos', atributos, {});
  
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
