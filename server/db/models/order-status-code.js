const Sequelize = require('sequelize')
const db = require('../db')

const OrderStatusCode = db.define('orderStatusCode', {
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = OrderStatusCode
