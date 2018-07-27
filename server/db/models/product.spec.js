const { expect } = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product Model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('Correctly adds name and name-type to the database', () => {
    it('affirms the correct name and type was added', done => {
      Product.create({
        name: 'Jack Daniels',
        price: 10.75,
        description: 'Enjoyable',
        SKU: 12345678,
        unitsInStock: 5,
        quantityPerUnit: 1,
        isFeatured: false,
        isActive: true
      })
        .then(product => {
          expect(product.get('name')).to.equal('Jack Daniels')
          expect(product.get('name')).to.not.equal('Jim Beam')
          expect(product.get('name')).to.be.a('string')
          expect(product.get('price')).to.deep.equal('10.75')
          expect(product.get('price')).to.not.equal(10.85)
          expect(product.get('price')).to.be.a('string')
          expect(product.get('description')).to.equal('Enjoyable')
          expect(product.get('description')).to.not.equal('enjoyable')
          expect(product.get('description')).to.be.a('string')
          expect(product.get('SKU')).to.equal(12345678)
          expect(product.get('SKU')).to.not.equal(1234565)
          expect(product.get('SKU')).to.be.a('number')
          expect(product.get('unitsInStock')).to.equal(5)
          expect(product.get('unitsInStock')).to.be.a('number')
          expect(product.get('isFeatured')).to.equal(false)
          expect(product.get('isFeatured')).to.be.a('boolean')
          expect(product.get('isActive')).to.equal(true)
          expect(product.get('isActive')).to.be.a('boolean')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
})
