const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Follow = sequelize.define('Follow', {
    followerId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    followingId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    tableName: 'follows'
});

module.exports = Follow;
