'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('users', 'pic', 'picture')
    ]);
  },

  down: (queryInterface) => {
    return Promise.all([queryInterface.renameColumn('users', 'picture', 'pic')]);
  },
};