import React, { Component } from 'react'
import Checkout from './Checkout'
import { connect } from 'react-redux'
import {
  fetchCart,
  fetchCartItems,
  updateCartItem,
  deleteCartItem,
  processOrder
} from '../store'
import order from '../store/order'

class CartView extends Component {
  async componentDidMount() {
    const orderId = this.props.match.params.orderId
    await this.props.getCart(orderId)
    await this.props.getCartItems(orderId)
  }

  handleSubmit = (event, orderId, statusCode) => {
    event.preventDefault()
    this.props.sendOrder(orderId, statusCode)
  }

  render() {
    const { cart, cartItems, match: { params: { orderId } } } = this.props
    cartItems.sort((a, b) => a.productId - b.productId) //must be sorted to stay in place upon quantity update
    const orderTotal = cartItems.reduce((acc, val) => {
      //helper func to calculate order total
      return acc + val.quantity * val.product.price
    }, 0)
    return (
      <div>
        <h2>Cart</h2>
        {!cartItems.length && <h2>There are no items in your cart</h2>}
        {cartItems.length &&
          cartItems.map(item => (
            <div
              key={item.product.id}
              style={{ margin: '15px', display: 'block' }}
            >
              {`Item: ${item.product.name}`}
              <p style={{ margin: '5px', display: 'block' }}>
                {`Price: ${item.product.price}`}
              </p>
              <p style={{ margin: '5px', display: 'block' }}>
                {`Quantity: ${item.quantity}`}
                <span style={{ margin: '10px' }}>
                  <button
                    type="button"
                    disabled={item.quantity <= 1 && 'true'} //prevent go below 0 quantity
                    onClick={() =>
                      this.props.updateCartItem(
                        orderId,
                        item.product.id,
                        item.quantity - 1
                      )
                    }
                  >
                    {' '}
                    -{' '}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      this.props.updateCartItem(
                        orderId,
                        item.product.id,
                        item.quantity + 1
                      )
                    }
                  >
                    {' '}
                    +{' '}
                  </button>
                </span>
              </p>
              <p style={{ margin: '5px', display: 'block' }}>
                {`Subtotal: $${(item.quantity * item.product.price).toFixed(
                  2
                )}`}
              </p>
              <button
                type="button"
                onClick={() =>
                  this.props.deleteCartItem(orderId, item.product.id)
                }
              >
                Remove Item
              </button>
            </div>
          ))}
        <p style={{ margin: '20px' }}>{`Total: $${orderTotal.toFixed(2)}`}</p>
        <div>
          <Checkout
            handleSubmit={this.handleSubmit}
            cart={cart}
            orderTotal={orderTotal}
            orderId={orderId}
            statusCode={3}
          />
        </div>
      </div>
    )
  }
}

const mapState = ({ cart }) => ({
  cart: cart.info,
  cartItems: cart.items
})

const mapDispatch = dispatch => ({
  getCart: cartId => dispatch(fetchCart(cartId)),
  getCartItems: cartId => dispatch(fetchCartItems(cartId)),
  updateCartItem: (orderId, productId, qty) =>
    dispatch(updateCartItem(orderId, productId, qty)),
  deleteCartItem: (orderId, productId) =>
    dispatch(deleteCartItem(orderId, productId)),
  sendOrder: (orderId, statusCode) =>
    dispatch(processOrder(orderId, statusCode))
})

export default connect(mapState, mapDispatch)(CartView)
