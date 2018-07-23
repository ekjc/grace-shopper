const User = require('./user')
const Reviews = require('./reviews')
const Categories = require('./categories')

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
Reviews.belongsTo(Products)
Products.hasMany(Reviews)

// Many to many relationship between products and categories
Products.hasMany(Categories)
Categories.hasMany(Products)

 
module.exports = {
  User,
  Reviews,
  Categories
}
