const router = require('express').Router()
const { Category } = require('../db/models')
module.exports = router

// get all categories — flattened
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

router.get('/:categoryId', async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.categoryId)
    res.json(category)

    // if (categoryId > 0) {
    //   const category = await Category.findById(categoryId)
    //   const children = await category.getChildren()

    //   const categoryAndChildren = {
    //     active: category,
    //     subcategories: children
    //   }
    //   return res.json(categoryAndChildren)
    // } else {
    //   const rootCategories = await Category.findAll({
    //     where: { parentId: null }
    //   })
    //   return res.json(rootCategories)
    // }
  } catch (err) {
    next(err)
  }
})

router.get('/:categoryId/children', async (req, res, next) => {
  try {
    const categoryId = +req.params.categoryId
    if (categoryId > 0) {
      const category = await Category.findById(categoryId)
      const children = await category.getChildren()
      return res.json(children)
    } else {
      const rootCategories = await Category.findAll({
        where: { parentId: null }
      })
      return res.json(rootCategories)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newCategory = await Category.create({
      name: req.body.name
    })

    if (req.body.parentId) {
      const parentCat = await Category.findOne({
        where: { id: req.body.parentId }
      })
      newCategory.setParent(parentCat)
    }

    res.json(newCategory)
  } catch (err) {
    next(err)
  }
})

router.put('/:categoryId', async (req, res, next) => {})

router.delete('/:categoryId', async (req, res, next) => {})