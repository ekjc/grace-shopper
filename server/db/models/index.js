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
Product.belongsToMany(Order, {through: OrderItem})

// Order model relationships
Order.belongsTo(User, { as: 'customer' })
Order.belongsToMany(Product, {through: OrderItem})
Order.belongsTo(Address)
Order.belongsTo(OrderStatusCode)

//Order Item relationships (these allow eager-loading on the join table)
OrderItem.belongsTo(Order)
OrderItem.belongsTo(Product)


// Review model relationships
Review.belongsTo(Product)
Review.belongsTo(User)

// Category model relationships
Category.belongsToMany(Product, { through: ProductCategory })
Category.belongsTo(Category, { as: 'parent' });

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
