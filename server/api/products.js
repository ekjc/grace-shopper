const router = require('express').Router()
const { Product, Category, ProductCategory } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch(err => next(err))
})

router.get('/:categoryName', async (req, res, next) => {
  try {
    const category = req.query.filter
      ? req.query.categoryName
      : req.params.categoryName

    console.log('category', category)

    const activeCategory = await Category.findOne({
      where: {
        name: category
      }
    })

    console.log('activeCategory', activeCategory)
    console.log('activeCategory data', activeCategory.dataValues)

    const products = await Product.findAll({
      include: [
        {
          model: ProductCategory,
          as: 'Category',
          where: {
            id: activeCategory.dataValues[0].id
          }
        }
      ]
    })

    // const products = await Product.findAll({
    //   where: {
    //     categoryId: activeCategory.id
    //   }
    // })
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
