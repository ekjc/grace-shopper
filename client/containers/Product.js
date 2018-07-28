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
    return (
      <div>
        <h1>Name: {product.name}</h1>
        <h3>Price: {product.price}</h3>
        <h3>Desciption: {product.description}</h3>
        <h3>SKU: {product.SKU}</h3>
        <h3>Units In Stock: {product.unitsInStock}</h3>
        <h3>Quantity Per Unit: {product.quantityPerUnit}</h3>
        <div>
        <input
          onChange={this.handleChange}
          type="number"
          value={this.state.quantityToAdd}
          name="quantityToAdd"
          min="1" max="200"/>
        {/* hardcoded orderId in createCartItem(), will need to be tied to user/session */}
        <button type="submit"
          onClick={() => this.props.createCartItem(1, productId, this.state.quantityToAdd)}>
             Add to Cart
           </button>
        </div>
        <br />
        <br />
        <br />
        <Link to={`/products/${product.id}/edit`}>
          <button type="button">Edit Product</button>
        </Link>
        <Link to={`/products/${product.id}/reviewForm`}>
          <button type="button">Add A Review</button>
        </Link>
        <Reviews productId={this.props.match.params.productId} />
      </div>
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
