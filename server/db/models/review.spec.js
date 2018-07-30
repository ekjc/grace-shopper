const { expect } = require('chai')
const db = require('../index')
const Review = db.model('review')

describe('Review Model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  afterEach(() => {
    return db.sync({ force: true })
  })

  describe('Validations', () => {
    it('requires rating', async () => {
      const review = Review.build()

      try {
        await review.validate()
        throw Error('validations was successful but should have failed without `rating`')
      } catch (error) {
        expect(error.message).to.contain('rating cannot be null')
      }
    })

    it('requires rating to be an integer', async () => {
      const review = Review.build({
        rating: 'FIVE STARS!'
      })

      try {
        await review.validate()
        throw Error('validation was successful but should have failed if rating is not an integer')
      } catch (error) {
        expect(error.message).to.contain('Validation error')
      }
    })

    it('requires rating to be between 1 and 5', async () => {
      const review = Review.build({
        rating: 100
      })

      try {
        await review.validate()
        throw Error('validation was successful but should have failed if rating is not between 1 and 5')
      } catch (error) {
        expect(error.message).to.contain('Validation error')
      }
    })
  })

  describe('Create', () => {
    it('should add a review and respond with the new object', done => {
      Review.create({
        subject: 'Delicious',
        content: 'I loved this!',
        rating: 5
      })
        .then(review => {
          expect(review.get('subject')).to.equal('Delicious')
          expect(review.get('subject')).to.be.a('string')
          expect(review.get('content')).to.equal('I loved this!')
          expect(review.get('content')).to.be.a('string')
          expect(review.get('rating')).to.equal(5)
          expect(review.get('rating')).to.be.a('number')
          expect(review.get('rating')).to.not.equal(6)
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
})
