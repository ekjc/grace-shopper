const Sequelize = require('sequelize')
const db = require('../db')

const Image = db.define('image', {
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'http://placehold.it/400x600'
  },
  sortOrder: {
    type: Sequelize.INTEGER
  }
})

module.exports = Image
