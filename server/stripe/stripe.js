const configureStripe = require('stripe')
const keySecret = require('../../secrets')

const STRIPE_SECRET_KEY = keySecret

const stripe = configureStripe(STRIPE_SECRET_KEY)

module.exports = stripe
