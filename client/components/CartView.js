import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchCart, fetchCartItems, updateCartItem } from '../store'

class CartView extends Component {
  async componentDidMount() {
    const orderId = this.props.match.params.orderId
    await this.props.getCart(orderId);
    await this.props.getCartItems(orderId)
  }

  render() {
    const { cart, cartItems } = this.props
    const orderId = this.props.match.params.orderId
    console.log('cart & cartItems from state in Cart View COMPONENT', cart, cartItems);
    const orderTotal = cartItems.reduce((acc, val) => {
      return acc + (val.quantity*val.product.price)
    }, 0)
    return (
      <div>
        <h2>Cart</h2>
        {cartItems.length &&
        cartItems.map(item => (
         <div key={item.product.id} style={{'margin':'15px', display: 'block'}}>
           {`Item: ${item.product.name}`}
           <a style={{'margin':'5px', display: 'block'}}>
             {`Price: ${item.product.price}`}
           </a>
           <a style={{'margin':'5px', display: 'block'}}>
             {`Quantity: ${item.quantity} metric alcohol units`}
             <span style={{'margin':'10px'}}>
               <button type='button'
                 onClick={() => this.props.updateCartItem(orderId, item.product.id, 6)}> + </button>
             </span>
           </a>
           <a style={{'margin':'5px', display: 'block'}}>
             {`Subtotal: ${item.quantity*item.product.price}`}
           </a>
         </div>
       ))}
      <div>
        {`Total: ${orderTotal} `}
      </div>
      </div>

    );
  }
}

const mapState = ({ cart }) => ({
  cart: cart.info,
  cartItems: cart.items
})

const mapDispatch = dispatch => ({
  getCart: cartId => dispatch(fetchCart(cartId)),
  getCartItems: cartId => dispatch(fetchCartItems(cartId)),
  updateCartItem: (orderId, productId, qty) => dispatch(updateCartItem(orderId, productId, qty))
})

export default connect(mapState, mapDispatch)(CartView)
