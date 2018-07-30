const { expect } = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product Model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  afterEach(() => {
    return db.sync({ force: true })
  })

  describe('Validations', () => {
    let product

    before(() => {
      product = Product.build({
        price: 10,
        SKU: 'ABC123',
        unitsInStock: 1
      })
    })

    it('requires name', async () => {
      try {
        await product.validate()
        throw Error('validation succeeded but should have failed')
      } catch (error) {
        expect(error.message).to.contain('name cannot be null')
      }
    })

    it('`isActive` should default as true', async () => {
      product.name = "Great Wine"

      try {
        await product.save()
        expect(product.isActive).to.be.equal(true)
      } catch(error) {
        throw new Error('Product.isActive should be true/false')
      }
    })
  })

  describe('Create', () => {
    beforeEach(() => {})

    it('should add a product and respond with the new object', done => {
      Product.create({
        name: 'Jack Daniels',
        price: 10.75,
        description: 'Enjoyable',
        SKU: 'XYZ123',
        unitsInStock: 5,
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
          expect(product.get('SKU')).to.equal('XYZ123')
          expect(product.get('SKU')).to.not.equal(1234565)
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
