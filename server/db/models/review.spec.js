const { expect } = require('chai')
const db = require('../index')
const Review = db.model('review')

describe('Review Model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })
  describe('Correctly add object and object type to the database', () => {
    it('responds with the object that was created', done => {
      Review.create({
        subject: 'Delicious Booze',
        content: 'Thoroughly enjoyed',
        rating: 5
      })
        .then(review => {
          expect(review.get('subject')).to.equal('Delicious Booze')
          expect(review.get('subject')).to.be.a('string')
          expect(review.get('content')).to.equal('Thoroughly enjoyed')
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
