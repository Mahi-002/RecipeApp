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

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    banned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'users'
});

module.exports = User;
