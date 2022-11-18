const {DataTypes, Model} = require('sequelize')
const db = require('../db')

class Note extends Model {}

Note.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    padding: {
        type: DataTypes.JSON,
        allowNull: false
    }
}, {sequelize: db})

module.exports = Note