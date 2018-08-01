import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import {
  fetchCategories,
  fetchCategory,
  fetchCategoryChildren,
  fetchProducts,
  fetchProductsByCategory
} from '../store'
import { ProductCard } from '../components'

class ProductList extends Component {
  componentDidMount() {
    // this.props.getCategories()
    this.props.getCategoryChildren()
    this.props.getProducts()
  }

  render() {
    const {
      category,
      products,
      isLoadingProducts,
      isLoadingCategories
    } = this.props

    // console.log('this.props', this.props)
    return (
      <div className="column is-9 is-10-widescreen">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <p>{products.length} results for <strong>{category.name || 'All Products'}</strong></p>
            </div>
          </div>
        </div>
        <hr style={{ marginBottom: '2rem' }} />
        <div className="columns is-multiline">
          {!products.length && (
            <div className="column">
              <div className="content">
                <p className="subtitle is-4">No products available in this category</p>
                <p>
                  Try browsing our <Link to="/products">catalog</Link> for
                  another product.
                </p>
              </div>
            </div>
          )}
          {products.map(product => (
            <div className="column is-6 is-4-desktop is-3-fullhd" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products.all,
  category: state.categories.active,
  isLoadingProducts: !!state.products.isLoading
})

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchProducts()),
  getProductsByCategory: id => dispatch(fetchProductsByCategory(id)),
  getCategories: () => dispatch(fetchCategories()),
  getCategory: id => dispatch(fetchCategory(id)),
  getCategoryChildren: id => dispatch(fetchCategoryChildren(id))
})

export default withRouter(connect(mapState, mapDispatch)(ProductList))
