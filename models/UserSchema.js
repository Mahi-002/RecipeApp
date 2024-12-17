const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db"); 

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
  name: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  banned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
}
});

module.exports = User;
