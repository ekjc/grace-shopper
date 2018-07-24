const Sequelize = require('sequelize')
const db = require('../db')

const ProductCategory = db.define('productCategory')

module.exports = ProductCategory
