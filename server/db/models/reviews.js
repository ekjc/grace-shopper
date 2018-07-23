const Sequelize = require('sequelize')
const db = require('../db')

const Reviews = db.define('users', {
  Content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  Rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  }
})

module.exports = Reviews
