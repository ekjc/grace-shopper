/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/users/', () => {
    beforeEach(() => {
      return User.create({
        firstName: 'Kayleen',
        lastName: 'Offringa',
        isAdmin: false,
        phone: '1234567890',
        email: 'kayleen@fullstack.edu',
        password: 'Blah'
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal('kayleen@fullstack.edu')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
