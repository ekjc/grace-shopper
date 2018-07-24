const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define(
  'order',
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false
    }
  },
  {
    hooks: {
      beforeCreate: (order, options) => {
        order.phoneNumber = order.phoneNumber.replace(/[^0-9]/g, '')
      }
    }
  }
)

module.exports = Order
