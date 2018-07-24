const Sequelize = require('sequelize')
const db = require('../db')

const Image = db.define('image', {
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'http://www.bluediamonds.co.uk/images/noimagesmall.png'
  },
  sortOrder: {
    type: Sequelize.INTEGER
  }
})

module.exports = Image
