const Review = require('./review')
const Category = require('./category')
const Address = require('./address')
const Image = require('./image')
const OrderItem = require('./order-item')
const OrderStatusCode = require('./order-status-code')
const Order = require('./order')
const Product = require('./product')
const User = require('./user')
const ProductCategory = require('./product-category')

// Product model relationships
Product.hasMany(Review)
Product.belongsToMany(Category, {through: ProductCategory })
Product.hasMany(Image)
Product.belongsToMany(Order, {through: OrderItem}) /* added for associations -ev */

// Order model relationships
Order.belongsTo(User, { as: 'customer' })
Order.belongsToMany(Product, {through: OrderItem}) /* added for associations -ev */
Order.belongsTo(Address)
Order.belongsTo(OrderStatusCode)

OrderItem.hasMany(Product, {foreignKey: 'productId'})
OrderItem.hasMany(Order, {foreignKey: 'orderId'})


// Review model relationships
Review.belongsTo(Product)
Review.belongsTo(User)

// Category model relationships
Category.belongsToMany(Product, { through: ProductCategory })

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
  Product,
  ProductCategory
}
