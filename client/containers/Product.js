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
      <div className="content">
        <h1 className="title is-2">{product.name}</h1>
        <p>Price: {product.price}</p>
        <p>Desciption: {product.description}</p>
        <p>SKU: #{product.SKU}</p>
        <p>Units In Stock: {product.unitsInStock}</p>
        <br />
        <br />
        <br />
        <Link to={`/product/${product.id}/edit`}>
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
