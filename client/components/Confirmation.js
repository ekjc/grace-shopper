import React, { Component } from 'react';
import { connect } from 'react-redux'

const Confirmation = (props) => {
  const { cart, items } = props
  const orderNumber = props.match.params.orderNumber
  console.log('orderNumber', orderNumber);
  return (
    <div>
      <h1 className="title is-1">Order complete</h1>
      <p className="subtitle">Thank you for you order!</p>
      <div className="notification">
        <p>Order #{cart.orderNumber}</p>
        <p>Status: Processing</p>
      </div>
      <h2 className="title is-4">Products ordered</h2>
      <table className="table is-fullwidth is-striped">
        <colgroup>
          <col style={{ width: '30%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '15%' }} />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Qty</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.product.id}>
              <td>{item.product.name}</td>
              <td>{item.quantity}</td>
              <td>${item.product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const mapState = ({ cart }) => ({
  cart: cart.info,
  items: cart.items
})

export default connect(mapState)(Confirmation)
