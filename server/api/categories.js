const router = require('express').Router()
const { Category } = require('../db/models')
const { isAdmin } = require('../utils')
module.exports = router

// get all categories — flattened
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      include: [{
        model: Category,
        as: 'parent',
        attributes: ['id', 'name', 'parentId'],
        include: [{
          model: Category,
          as: 'parent',
          attributes: ['id', 'name', 'parentId']
        }]
      }]
    })
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

router.get('/:categoryId', async (req, res, next) => {
  try {
    const category = await Category.findOne({
      where: {
        id: req.params.categoryId
      },
      include: [{
        model: Category,
        as: 'parent',
        attributes: ['id', 'name', 'parentId'],
        include: [{
          model: Category,
          as: 'parent',
          attributes: ['id', 'name', 'parentId']
        }]
      }]
    })
    res.json(category)
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

router.post('/', isAdmin, async (req, res, next) => {
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

    res.status(201).json(newCategory)
  } catch (err) {
    next(err)
  }
})

router.put('/:categoryId', isAdmin, async (req, res, next) => {})

router.delete('/:categoryId', isAdmin, async (req, res, next) => {})
