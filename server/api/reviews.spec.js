/* global describe beforeEach it */

const { expect } = require('chai')

// Models
const db = require('../db')
const Review = db.model('review')

// Routes
const app = require('../index')
const agent = require('supertest')(app)

describe('Review routes', () => {
  let storedReviews;

  const reviewData = [
    { rating: 5, content: 'Excellent'},
    { rating: 1, content: 'Terrible'}
  ]

  beforeEach(() => {
    return db.sync({ force: true })
  })

  beforeEach(async () => {
    const createdReviews = await Review.bulkCreate(reviewData)
    storedReviews = createdReviews.map(review => review.dataValues)
  })

  describe('GET /api/reviews/ route', () => {
    it('responds with all reviews', async () => {
      const res = await agent
        .get('/api/reviews')
        .expect(200)

      expect(res.body).to.have.length(2)
      expect(res.body[0].content).to.equal(storedReviews[0].content)
      expect(res.body[1].rating).to.equal(storedReviews[1].rating)
    })
  })

  describe('GET /api/reviews/:id route', () => {
    it('serves a single review by its id', async () => {
      const res = await agent
        .get('/api/reviews/1')
        .expect(200)

      expect(res.body.content).to.equal('Excellent')
    })
  })

  describe('POST /api/reviews route', () => {
    it('should create a review', async () => {
      const dataToSend = {
        review: {
          rating: 3,
          subject: 'Add My Review',
          content: 'I liked it.'
        }
      }
      const res = await agent
        .post('/api/reviews')
        .send(dataToSend)
        .expect(201)
      const createdReview = await Review.findById(res.body.id)
      expect(createdReview.subject).to.be.equal('Add My Review')
    })
  })
})
