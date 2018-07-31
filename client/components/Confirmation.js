import React, { Component } from 'react';
import { connect } from 'react-redux'

const Confirmation = (props) => {
  const {cart, cartItems} = props
  const orderNumber = props.match.params.orderNumber
  console.log(orderNumber);
  return (
    <div style={{ marginTop: '15px' }}>
      <h1 style={{ marginTop: '.5rem', fontWeight: 'bold' }} > Thank you for your order {cart.email}! </h1>
      <p style={{ marginTop: '.5rem' }}> Order {cart.orderNumber} </p>
      <p> Status: Processing </p>
      <p style={{ marginTop: '2rem', fontWeight: 'bold' }}> Items Purchased </p>
      {cartItems.map(item => (
        <ul key={item.product.id}>
        <li style={{ marginTop: '.5rem', fontWeight: 'bold' }}>{item.product.name}</li>
        <li>${item.product.price}</li>
        <li>Quantity Purchased: {item.quantity}</li>
      </ul>
      ))}
    </div>
  )
}

const mapState = ({ cart }) => ({
  cart: cart.info,
  cartItems: cart.items
})

export default connect(mapState)(Confirmation)
