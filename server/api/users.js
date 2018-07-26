const router = require('express').Router()
const {User} = require('../db/models')
const {Review} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      // attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// Fetch all reviews written by a specific user
// Route address /api/users/reviews/:userId
router.get('/reviews/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const reviewsMadeByUser = await Review.findAll({
      where: {
        userId: userId
      }
    })
    res.json(reviewsMadeByUser)    
  } catch (err) {
    console.error('Your error was ', err)

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      password: req.body.password
    }, {
      where: { id: req.params.userId },
      returning: true,
      plain: true
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})
