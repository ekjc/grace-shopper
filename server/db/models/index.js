const User = require('./user')
const Review = require('./review')
const Category = require('./category')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

//One to many relationship between reviews and products
Review.belongsTo(Product)
Product.hasMany(Review)

// Many to many relationship between products and categories
Products.hasMany(Category)
Category.hasMany(Product)

 
module.exports = {
  User,
  Review,
  Category
}
