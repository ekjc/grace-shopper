const { expect } = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
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
