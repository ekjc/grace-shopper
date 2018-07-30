import React, { Component } from 'react'
import { Checkout } from './Checkout'
import { connect } from 'react-redux'
import {
  fetchCart,
  fetchCartItems,
  updateCartItem,
  deleteCartItem,
  processOrder
} from '../store'

class CartView extends Component {
  async componentDidMount() {
    const orderId = this.props.match.params.orderId
    await this.props.getCart(orderId)
    await this.props.getCartItems(orderId)
  }

  render() {
    const {
      cart,
      cartItems,
      sendOrder,
      match: { params: { orderId } }
    } = this.props

    // must be sorted to stay in place upon quantity update
    cartItems.sort((a, b) => a.productId - b.productId)

    // helper func to calculate order total
    const orderTotal = cartItems.reduce((acc, val) => {
      return acc + val.quantity * val.product.price
    }, 0)

    return (
      <div>
        <h1 className="title is-2">Cart</h1>
        {!cartItems.length && (
          <p className="subtitle is-4">There are no items in your cart</p>
        )}
        {!!cartItems.length && cartItems.map(item => (
            <div
              key={item.product.id}
              className="content"
            >
              <p className="title is-5">{`Item: ${item.product.name}`}</p>
              <p>{`Price: ${item.product.price}`}</p>
              <p>
                {`Quantity: ${item.quantity}`}
                <span style={{ margin: '10px' }}>
                  <button
                    type="button"
                    className="button is-small"
                    // prevent go below 0 quantity
                    disabled={item.quantity <= 1 && 'true'}
                    onClick={() =>
                      this.props.updateCartItem(
                        orderId,
                        item.product.id,
                        item.quantity - 1
                      )
                    }
                  >
                    -
                  </button>
                  <button
                    type="button"
                    className="button is-small"
                    onClick={() =>
                      this.props.updateCartItem(
                        orderId,
                        item.product.id,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>
                </span>
              </p>
              <p>{`Subtotal: $${(item.quantity * item.product.price).toFixed(2)}`}</p>
              <button
                type="button"
                className="button is-outlined is-danger"
                onClick={() =>
                  this.props.deleteCartItem(orderId, item.product.id)
                }
              >
                Remove item
              </button>
            </div>
          ))}
        {!!cartItems.length && (
          <div>
            <hr  style={{ margin: '2rem 0' }} />
            <p className="is-size-5 has-text-weight-bold">
              {`Total: $${orderTotal.toFixed(2)}`}
            </p>
            <div>
              <Checkout sendOrder={sendOrder} cart={cart} />
            </div>
          </div>
        )}
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
