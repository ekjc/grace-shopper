const router = require('express').Router()
const { Review, Product } = require('../db/models')
module.exports = router

// get all reviews :: /api/reviews
router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll()
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

// get single review :: /api/reviews/:reviewId
router.get('/:reviewId', async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.reviewId)
    res.json(review)
  } catch (err) {
    next(err)
  }
})

//  get all reviews for a product :: /api/reviews/product/:productId
router.get('/product/:productId', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: { productId: +req.params.productId }
    })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

// get all reviews for a user :: /api/reviews/user/:userId
router.get('/user/:productId', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: { userId: +req.params.userId }
    })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

// add review :: /api/reviews
router.post('/', async (req, res, next) => {
  try {
    const newReview = await Review.create({
      subject: req.body.review.subject,
      content: req.body.review.content,
      rating: req.body.review.rating,
    })

    newReview.setProduct(req.body.productId)
    newReview.setUser(req.body.userId)

    res.json(newReview)
  } catch (err) {
    next(err)
  }
})

// update review :: /api/reviews/:reviewId
router.put('/:reviewId', async (req, res, next) => {
  try {
    const { data: review } = await Review.update(
      {
        subject: req.body.review.subject,
        content: req.body.review.content,
        rating: req.body.review.rating
      },
      {
        where: { id: req.params.reviewId },
        returning: true,
        plain: true
      }
    )
    res.json(review)
  } catch (err) {
    next(err)
  }
})

// delete review :: /api/reviews/:reviewId
router.delete('/:reviewId', async (req, res, next) => {
  try {
    const reviewToDelete = await Review.findById(req.params.reviewId)
    Review.destroy(reviewToDelete)
  } catch (err) {
    next(err)
  }
})
