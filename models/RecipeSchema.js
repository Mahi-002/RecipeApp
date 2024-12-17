const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db"); // Adjust the path as needed

const Recipe = sequelize.define("Recipe", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.TEXT, // Use TEXT to store JSON
    allowNull: false,
    get() {
      const value = this.getDataValue("ingredients");
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue("ingredients", JSON.stringify(value));
    },
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dietaryPreference:{
    type: DataTypes.STRING,
  },
  cookingTime:{
    type: DataTypes.STRING,
  },
  servings:{
    type: DataTypes.STRING,
    },
  category:{
      type: DataTypes.STRING,
  },
  preparationTime:{
      type: DataTypes.STRING,
    },
  difficultyLevel:{
      type: DataTypes.STRING,
    }
});

module.exports = Recipe;
