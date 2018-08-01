import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCategoryChildren, fetchProductsByCategory } from '../store'
import { ProductCard } from '../components'

class ProductList extends Component {

  render() {
    const { products, isLoading } = this.props

    return (
      <React.Fragment>
        {!products.length && (
          <div className="content">
            <h3 className="subtitle is-4">No products available in this category</h3>
            <p>
              Try browsing our <Link to="/products">catalog</Link> for
              another product.
            </p>
          </div>
        )}
        {products.map(product => (
          <div className="column is-6 is-4-desktop is-3-fullhd" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  // products: state.products.all
})

const mapDispatch = dispatch => ({
  // getProductsByCategory: id => dispatch(fetchProductsByCategory(id)),
  // getCategoryChildren: id => dispatch(fetchCategoryChildren(id))
})

export default connect(mapState, mapDispatch)(ProductList)
