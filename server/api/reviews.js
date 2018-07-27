const router = require('express').Router()
const { Review, Product } = require('../db/models')
module.exports = router

// Fetch all reviews
// route address /api/reviews/product/:productId
router.get('/', async (req, res, next) => {
  try {
    const allReviews = await Review.findAll()
    res.json(allReviews)
  } catch (err) {
    next(err)
  }
})

// Fetch reviews with specific productId
// Route address /api/reviews/product/:productId
router.get('/product/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId
    const review = await Review.findAll({
      where: {
        productId: productId
      }
    })
    res.json(review)
  } catch (err) {
    next(err)
  }
})

// Fetch all reviews with specific userId
// route address /api/reviews/users/:userId
router.get('/user/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const reviewsFromUser = await Review.findAll({
      where: {
        userId: userId
      }
    })
    res.json(reviewsFromUser)
  } catch (err) {
    next(err)
  }
})

// Create new Review
// Route address /api/reviews
router.post('/', async (req, res, next) => {
  try {
    console.log('req.body.content', req.body.content)
    const newReview = await Review.create({
      subject: req.body.review.subject,
      content: req.body.review.content,
      rating: req.body.review.rating,
      productId: req.body.productId
    })
    res.json(newReview)
  } catch (err) {
    next(err)
  }
})

// Edit review
// Route address /api/reviews/:reviewId
router.put('/:reviewId', async (req, res, next) => {
    try {
      const reviewId = req.params.reviewId  
      const reviewToUpdate = await Review.findById(reviewId)
      await reviewToUpdate.update(req.body)
    } catch(err) {
        next(err)
    }
})

router.delete('/:reviewId', async (req, res, next) => {
  try {
    const reviewToDelete = await Review.findById(req.params.reviewId)
    Review.destroy(reviewToDelete)
  } catch (err) {
    next(err)
  }
})
