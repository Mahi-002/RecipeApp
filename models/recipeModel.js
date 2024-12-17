const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('recipe_app', 'root', 'Mahi@2002', {
    host: 'localhost',
    dialect: 'mysql'
});
sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});

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
  });

module.exports = Recipe;
