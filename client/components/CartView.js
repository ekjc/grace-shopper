import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchCart, fetchCartItems, updateCartItem, deleteCartItem} from '../store'

class CartView extends Component {
  async componentDidMount() {
    const orderId = this.props.match.params.orderId
    await this.props.getCart(orderId);
    await this.props.getCartItems(orderId)
  }

  render() {
    const { cart, cartItems } = this.props
    cartItems.sort((a , b) => (a.productId - b.productId));  //must be sorted to stay in place upon quantity update
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
           <p style={{'margin':'5px', display: 'block'}}>
             {`Price: ${item.product.price}`}
           </p>
           <p style={{'margin':'5px', display: 'block'}}>
             {`Quantity: ${item.quantity}`}
             <span style={{'margin':'10px'}}>
                 <button type='button' disabled={item.quantity <= 1 && "true"} //prevent go below 0 quantity
                   onClick={() => this.props.updateCartItem(orderId, item.product.id, item.quantity-1)}> - </button>
                   <button type='button'
                     onClick={() => this.props.updateCartItem(orderId, item.product.id, item.quantity+1)}> + </button>
             </span>
           </p>
           <p style={{'margin':'5px', display: 'block'}}>
             {`Subtotal: $${(item.quantity*item.product.price).toFixed(2)}`}
           </p>
           <button type='button'
             onClick={() => this.props.deleteCartItem(orderId, item.product.id)}>
             Remove Item
           </button>
         </div>
       ))}
      <div>
        {`Total: $${orderTotal.toFixed(2)} `}
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
  updateCartItem: (orderId, productId, qty) => dispatch(updateCartItem(orderId, productId, qty)),
  deleteCartItem: (orderId, productId) => dispatch(deleteCartItem(orderId, productId))
})

export default connect(mapState, mapDispatch)(CartView)
