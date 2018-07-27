import React, { Component } from 'react'
import axios from 'axios'
import { Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchProduct } from '../store'
import Reviews from './Reviews'

class Product extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.productId)
  }

  render() {
    const { product, isLoading, isAdmin } = this.props
    return (
      <div>
        <h1>Name: {product.name}</h1>
        <h3>Price: {product.price}</h3>
        <h3>Desciption: {product.description}</h3>
        <h3>SKU: {product.SKU}</h3>
        <h3>Units In Stock: {product.unitsInStock}</h3>
        <h3>Quantity Per Unit: {product.quantityPerUnit}</h3>
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
  getProduct: productId => dispatch(fetchProduct(productId))
})

export default connect(mapState, mapDispatch)(Product)
