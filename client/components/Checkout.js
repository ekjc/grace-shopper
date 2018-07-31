import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import { keyPublishable } from '../../secrets'

const PAYMENT_SERVER_URL = 'http://localhost:8080'
const CURRENCY = 'USD'

const dollarsToCents = amount => amount * 100

const successPayment = data => {
  alert('Payment was successfully processed')
}

const errorPayment = data => {
  alert('An error occurred with the processing of payment information')
}

const onToken = (amount, description) => token =>
  axios
    .put(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: dollarsToCents(amount)
    })
    .then(successPayment)
    .catch(errorPayment)

const Checkout = ({ handleSubmit, cart, orderId, statusCode, orderTotal }) => {
  console.log(
    'cart',
    cart,
    'handleSubmit',
    handleSubmit,
    'orderID',
    orderId,
    'statusCode',
    statusCode,
    'orderTotal',
    orderTotal
  )
  return (
    <div>
      <span style={{ margin: '10px' }}>
        <StripeCheckout
          name={'Thank you for shopping!'}
          amount={dollarsToCents(orderTotal)}
          token={onToken(orderTotal, orderId)}
          currency={CURRENCY}
          stripeKey={keyPublishable}
        />
      </span>
    </div>
  )
}

export default Checkout
