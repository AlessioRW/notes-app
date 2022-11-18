const {DataTypes, Model} = require('sequelize')
const db = require('../db')

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING
    }
}, {sequelize: db})

module.exports = User