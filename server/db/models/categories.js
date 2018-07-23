const Sequelize = require('sequelize')
const db = require('../db')

const Categories = db.define('categories', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  parentId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Categories
