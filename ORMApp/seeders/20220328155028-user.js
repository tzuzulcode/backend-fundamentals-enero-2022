'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    return await queryInterface.bulkInsert('Users', [{
      name:"Tzuzul Code",
      username:"tzuzulcode",
      email:"mail@tzuzulcode.com",
      birthday:"1998-05-10",
      password:"12345",
      profilePic:"https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Profile-Picture.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('Users', null, {});
  }
};
