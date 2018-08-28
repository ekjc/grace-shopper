const router = require('express').Router()
const Op = require('sequelize').Op
const { Product, Category, ProductCategory, Review } = require('../db/models')
const { isAdmin } = require('../utils')
module.exports = router

// Get all products :: /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [['id', 'ASC']]
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// Find a product by its id :: /api/products/:productId
router.get('/:productId', async (req, res, next) => {
  try {
    const productWithId = await Product.findById(req.params.productId)
    res.json(productWithId)
  } catch (err) {
    console.error('Your error was ', err)
    next(err)
  }
})

// Get all products by category :: /api/products/categories/:categoryId
router.get('/categories/:categoryId', async (req, res, next) => {
  try {
    const categoryId = +req.params.categoryId
    if (categoryId > 0) {
      const productsFromJoinTable = await ProductCategory.findAll({
        where: { categoryId: categoryId }
      })

      // If there are no products in `ProductCategory`, return empty array.
      // Otherwise, the final `res.json()` will include every product in db.
      if (!productsFromJoinTable.length) return res.json([])

      const productIds = productsFromJoinTable.map(p => p.productId)
      const products = await Product.findAll({
        where: { id: { [Op.or]: productIds } }
      })
      return res.json(products)
    } else {
      return res.json({ name: 'WHAT?' })
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const newProduct = await Product.create({
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      SKU: req.body.SKU,
      unitsInStock: req.body.unitsInStock,
      isFeatured: req.body.isFeatured,
      isActive: req.body.isActive
    })

    res.status(201).json(newProduct)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', isAdmin, async (req, res, next) => {
  try {
    const { data: product } = await Product.update(
      {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        SKU: req.body.SKU,
        unitsInStock: req.body.unitsInStock,
        isFeatured: req.body.isFeatured,
        isActive: req.body.isActive
      },
      {
        where: { id: req.params.productId },
        returning: true,
        plain: true
      }
    )
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', isAdmin, async (req, res, next) => {
  const productId = +req.params.productId
  try {
    await Product.destroy({ where: { id: productId } })
    res.json(productId)
  } catch (err) {
    next(err)
  }
})
