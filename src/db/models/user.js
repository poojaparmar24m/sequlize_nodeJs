// "use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class user extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   user.init(
//     {
//       user_name: DataTypes.STRING,
//       email: DataTypes.STRING,
//       password: DataTypes.STRING,
//     },
//     {
//       sequelize,
//       modelName: "user",
//     }
//   );
//   return user;
// };

const Sequelize = require("sequelize");
const sequelize = require("../../config/dbConnection");
const user = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = user;
