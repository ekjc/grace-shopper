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

// Get products all within a "parent" category (beer, wine, spirits)
router.get('/:id', async (req, res, next) => {
  try {
    // 1 = Beer, 2 = Wine, 3 = Spirits (assuming these will be stable, we can avoid an additional API call)
    const categoryId = req.params.id

    // 1st level down
    const subCategories = await Category.findAll({
      where: { parentId: categoryId }
    })

    const workingSubCategoryIds = subCategories.map(cat => cat.id)

    // 2nd level down (if present...right now only wine has this)
    const types = await Category.findAll({
      where: {
        parentId: {
          $or: workingSubCategoryIds
      }}
    })

    const workingTypeIds = types.map(type => type.id)

    /* Get all products that have ANY of the subCategory OR type IDs we're interested in
    for the particular parent category requested */
    const productCategoryData = await ProductCategory.findAll({
      where: {
          $or: [ {categoryId: workingSubCategoryIds}, {categoryId: workingTypeIds} ]
      }
    })

    const workingProductIds = productCategoryData.map(product => product.productId)

    //this will find ALL products if the workingProductIds array is empty -- fix that
    const products = await Product.findAll({
      where: {
        id: {
          $or: workingProductIds
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
