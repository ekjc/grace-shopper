const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  subject: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.TEXT
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 1,
      max: 5
    }
  }
})

module.exports = Review
