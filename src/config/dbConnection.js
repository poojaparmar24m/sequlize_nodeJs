const Sequelize = require("sequelize");

const sequelize = new Sequelize("students", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
