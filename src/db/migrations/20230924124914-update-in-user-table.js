"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "user_name", {
      allowNull: false,
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn("users", "email", {
      allowNull: false,
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn("users", "password", {
      allowNull: false,
      type: Sequelize.STRING,
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "user_name", {
      allowNull: true,
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn("users", "email", {
      allowNull: true,
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn("users", "password", {
      allowNull: true,
      type: Sequelize.STRING,
    });

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
