const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Collection = sequelize.define('Collection', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    tableName: 'collections'
});

module.exports = Collection;
