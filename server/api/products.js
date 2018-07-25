const router = require('express').Router()
const { Product, Category, ProductCategory } = require('../db/models')
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

// Find a product by its id
// Route address /api/products/:productId
router.get('/:productId', async (req, res, next) => {
  try {
    const productWithId = await Product.findById(req.params.productId)
    res.json(productWithId)
  } catch (err) {
    console.error('Your error was ', err)
    next(err)
  }
})

// Get all products by category :: /api/categories/:categoryId
router.get('/categories/:categoryId', async (req, res, next) => {
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

router.post('/addProduct', async (req, res, next) => {
  const newProduct = await Product.create(req.body).catch(next)
  res.json(newProduct)
})

//The route below does not post to the database, but I didn't want to delete without consensus...new simple route above

// router.post('/addProduct', (req, res, next) => {
//   Product.create({
//     name: req.body.name,
//     description: req.body.description,
//     sku: req.body.sku,
//     price: req.body.price,
//     unitsInStock: req.body.unitsInStock,
//     quantityPerUnit: req.body.quantityPerUnit,
//     isFeatured: req.body.isFeatured,
//     isActive: req.body.isActive
//   })
//     .then(product =>
//       res.json({
//         message: 'Created successfully',
//         body: product
//       })
//     )
//     .catch(err => {
//       const errTitle = 'Unable to create product'
//       res.status(500).json({ error: err, title: errTitle })
//     })
// })

// router.put("/:productId/editProduct", async (req, res, next) => {
//   const product = await Product.findById(req.params.productId).catch(next);
//   await product.update(req.body).catch(next);
//   res.status(204).end();
// });

router.put('/:productId/editProduct', (req, res, next) => {
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
      where: { id: req.params.productId },
      returning: true,
      plain: true
    }
  )
    .spread((numAffected, product) => {
      res.json({ message: 'Updated successfully', body: product })
    })
    .catch(err => res.status(500).json({ error: err }))
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
