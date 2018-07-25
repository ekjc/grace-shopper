const router = require('express').Router()
const {Product, Category, ProductCategory} = require('../db/models')
module.exports = router

// Get all products :: /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  }
  catch (err) {
    next(err)
  }
})

// Get all products by category :: /api/products/:categoryId
router.get('/:categoryId', async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId
    const matchingProductsFromJoinTable = await ProductCategory.findAll({
      where: { categoryId: categoryId }
    })

    const productIds = matchingProductsFromJoinTable.map(product => product.productId)

    const products = await Product.findAll({
      where: {
        id: {
          $or: productIds
        }
      }
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})





router.post('/', (req, res, next) => {
  Product.create({
    name: req.body.name,
    description: req.body.description,
    sku: req.body.sku,
    price: req.body.price,
    unitsInStock: req.body.unitsInStock,
    quantityPerUnit: req.body.quantityPerUnit,
    isFeatured: req.body.isFeatured,
    isActive: req.body.isActive
  })
    .then(product =>
      res.json({
        message: 'Created successfully',
        body: product
      })
    )
    .catch(err => {
      const errTitle = 'Unable to create product'
      res.status(500).json({error: err, title: errTitle})
    })
})

router.put('/:productId', (req, res, next) => {
  Product.update(
    {
      name: req.body.name,
      description: req.body.description,
      sku: req.body.sku,
      price: req.body.price,
      unitsInStock: req.body.unitsInStock,
      quantityPerUnit: req.body.quantityPerUnit,
      isFeatured: req.body.isFeatured,
      isActive: req.body.isActive
    },
    {
      where: {id: req.params.productId},
      returning: true,
      plain: true
    }
  )
    .spread((numAffected, product) => {
      res.json({message: 'Updated successfully', body: product})
    })
    .catch(err => res.status(500).json({error: err}))
})

router.delete('/:productId', (req, res, next) => {
  Product.destroy({
    where: {
      id: req.params.productId
    }
  }).then(id =>
    res.json({
      message: 'Deleted successfully',
      body: +req.params.id
    })
  )
})
