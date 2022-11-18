const {Sequelize} = require('sequelize')
const path = require('path')

const db = new Sequelize({
    storage: path.join(__dirname, 'database.sqlite'),
    logging: false,
    dialect: 'sqlite'
})

module.exports = db