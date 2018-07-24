const Review = require('./review')
const Category = require('./category')
const Address = require('./address')
const Image = require('./image')
const OrderItem = require('./order-item')
const OrderStatusCode = require('./order-status-code')
const Order = require('./order')
const Product = require('./product')
const User = require('./user')

// Product model relationships
//Product.belongsTo(OrderItem)
Product.hasMany(Review)
Product.belongsToMany(Category, {through: 'productCategory'})
Product.hasMany(Image)

// Order model relationships
Order.belongsTo(User, {as: 'customer'})
Order.hasMany(OrderItem)
Order.belongsTo(Address)
Order.belongsTo(OrderStatusCode)

OrderItem.belongsTo(Product)

// Review model relationships
Review.belongsTo(Product)
Review.belongsTo(User)

// Category model relationships
Category.belongsToMany(Product, {through: 'productCategory'})

// User model relationships
User.belongsTo(Address)

module.exports = {
  User,
  Review,
  Category,
  Address,
  Image,
  OrderItem,
  OrderStatusCode,
  Order,
  Product
}
