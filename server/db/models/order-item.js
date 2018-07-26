const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
  }
})

module.exports = OrderItem
