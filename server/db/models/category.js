const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

Category.prototype.addChild = function(obj) {
  return Category.create(obj)
    .then(newCategory => newCategory.setParent(this))
    .catch(console.error)
}

Category.prototype.getChildren = function() {
  return Category
    .findAll({ where: { parentId: this.id } })
    .catch(console.error)
}

Category.prototype.getSiblings = function() {
  return Category.findAll({
    where: {
      parentId: this.parentId,
      id: { $ne: this.id }
    }
  }).catch(console.error)
}

module.exports = Category
