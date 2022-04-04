'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.removeColumn("Users","birthday")
    await queryInterface.addColumn("Users","birthday",Sequelize.DATEONLY)
    await queryInterface.addColumn("Users","role",Sequelize.STRING)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     //await queryInterface.dropTable('Users');
    
    await queryInterface.removeColumn("Users","role")
    await queryInterface.removeColumn("Users","birthday")
  }
};
