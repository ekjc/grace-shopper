import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchCart, fetchCartItems } from '../store'

class CartView extends Component {
  componentDidMount() {
    this.props.getCart();
  }

  render() {
    const { cart } = this.props
    return (
      <div>
        {cart.items.map(item => (
          <div key={item.id}>{}</div>
        ))}
      </div>
    );
  }
}

const mapState = ({ cart }) => ({
  cart
})

const mapDispatch = dispatch => ({
  getCart: cartId => dispatch(fetchCart(cartId)),
  getCartItems: cartId => dispatch(fetchCartItems(cartId))
})

export default connect(mapState, mapDispatch)(CartView)
