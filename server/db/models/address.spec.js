const { expect } = require('chai')
const db = require('../index')
const Address = db.model('address')

describe('Address Model', () => {
  describe('Create', () => {
    beforeEach(() => {})

    it('should add an address and respond with the new object', done => {
      Address.create({
        street1: 'some road',
        street2: 'another road',
        city: 'Brawley',
        state: 'California',
        zip: '61598',
        country: 'USA'
      })
        .then(address => {
          expect(address.get('street1')).to.equal('some road')
          expect(address.get('street2')).to.not.equal('nowhere')
          expect(address.get('city')).to.be.a('string')
          expect(address.get('state')).to.deep.equal('California')
          expect(address.get('zip')).to.equal('61598')
          expect(address.get('country')).to.equal('USA')
          expect(address.get('country')).to.not.equal('Norway')
          expect(address.get('city')).to.equal('Brawley')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
})
