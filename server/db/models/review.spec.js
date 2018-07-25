const { expect } = require('chai')
const db = require('../index')
const Review = db.model('review')

describe('Review model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('instanceMethods', () => {
    describe('SOMETHING DOES SOMETHING', () => {
      it('AND IT DOES IT CORRECTLY', () => {
        // expect()
      })
    })
  })
})
