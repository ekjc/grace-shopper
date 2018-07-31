import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts, deleteProduct } from '../store'
import { ProductRow } from '../components'

class ManageProducts extends Component {
  componentDidMount() {
    this.props.getProducts()
  }

  handleDelete = (event, product) => {
    event.preventDefault()
    this.props.deleteProduct(product)
  }

  render() {
    const { products, isLoading, deleteProduct } = this.props

    if (isLoading) return null

    return (
      <div>
        <h2 className="title is-3">Products</h2>
        <table className="table is-fullwidth is-striped">
          <colgroup>
            <col style={{ width: '6%' }} />
            <col style={{ width: '44%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '20%' }} />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">SKU</th>
              <th scope="col"></th>
              <th />
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <ProductRow
                key={product.id}
                product={product}
                deleteProduct={this.handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  isLoading: !!state.products.isLoading,
  products: state.products.all
})

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchProducts()),
  deleteProduct: product => dispatch(deleteProduct(product))
})

export default connect(mapState, mapDispatch)(ManageProducts)

/**
 * PROP TYPES
 */
ManageProducts.propTypes = {
  products: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
}
