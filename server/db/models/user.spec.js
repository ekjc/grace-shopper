/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let kayleen

      beforeEach(async () => {
        kayleen = await User.create({
          firstName: 'Kayleen',
          lastName: 'Offringa',
          isAdmin: false,
          phone: '1234567890',
          email: 'kayleen@fullstack.edu',
          password: 'Blah'
        })
      })

      it('returns true if the password is correct', () => {
        expect(kayleen.correctPassword('Blah')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(kayleen.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
