import React, { Component } from 'react'
import axios from 'axios'
import { Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchProduct, createCartItem } from '../store'
import Reviews from './Reviews'

class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantityToAdd: 1
    }
  }

  componentDidMount() {
    this.props.getProduct(this.props.match.params.productId)
  }

  handleChange = event => {
    this.setState({ [event.target.name]: +[event.target.value] })
  }

  render() {
    const { product, isLoading, isAdmin, match: {  params: { productId } } } = this.props
    console.log(this.props)
    return (
      <div className='container'>
        <div className='columns'>
          <div className='column is-three-fifths'>
            <img src={product.imageUrl} />
          </div>
            {/* <div className='columns'> */}
              <div className='column'><h1 className='title'>{product.name}</h1></div>
            {/* </div> */}
            {/* <div className='columns'> */}
              <div className='column'><h1 className='title'>${product.price}</h1></div>
            {/* </div> */}
            {/* <div className='columns'>   */}
              <div className='column'><p className='has-text-info'>{product.description}</p></div>
            {/* </div> */}
        </div>
        <div>
        <input
          onChange={this.handleChange}
          type="number"
          value={this.state.quantityToAdd}
          name="quantityToAdd"
          min="1" max="200"/>
        {/* hardcoded orderId in createCartItem() as first arg, will need to be tied to user/session */}
        <button type="submit"
          onClick={() => this.props.createCartItem(1, productId, this.state.quantityToAdd)}>
             Add to Cart
           </button>
        </div>

        <br />
        <br />
        <br />
        <Link to={`/manage/product/${product.id}`}>
          <button type="button">Edit Product</button>
        </Link>
        <Link
          to={{
            pathname: '/review/add',
            state: { product: product }
          }}
        >
          <button type="button">Add A Review</button>
        </Link>
        <Reviews productId={this.props.match.params.productId} />
      </div>
      // {/* </div> */}
    )
  }
}

const mapState = state => ({
  isLoading: state.products.isLoading,
  isAdmin: state.me.isAdmin,
  product: state.products.active
})

const mapDispatch = dispatch => ({
  getProduct: productId => dispatch(fetchProduct(productId)),
  createCartItem: (orderId, productId, qty) => dispatch(createCartItem(orderId, productId, qty))
})

export default connect(mapState, mapDispatch)(Product)
