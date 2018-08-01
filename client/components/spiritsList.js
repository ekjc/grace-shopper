import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ProductCard, CategoryMenu } from './index'
import {
  fetchProductsByCategory,
  fetchCategoryChildren,
  fetchCategory
} from '../store'
import { connect } from 'react-redux'

class SpiritsList extends Component {
  async componentDidMount() {
    await this.props.getProductsByCategory(3)
    this.props.getCategoryChildren(3)
  }

  handleClick = (event, category) => {
    event.preventDefault()
    this.props.getCategory(category.id)
    this.props.getProductsByCategory(category.id)
    this.props.getCategoryChildren(3)
  }

  render() {
    const { products, categories, isLoadingCategories } = this.props
    console.log('this is props wineList', this.props.products)
    return (
      <div>
        <h1 className="title is-1">Spirits</h1>
        <div className="columns">
          <div className="column is-3">
            <CategoryMenu
              categories={categories}
              handleClick={this.handleClick}
              isLoading={isLoadingCategories}
            />
          </div>
        </div>
        <div className="column is-9">
          {/* <h1>Hello from BeerList</h1> */}
          <div className="columns is-multiline">
            {!products.length && (
              <div className="content">
                <h3>No products available in this category</h3>
                <p>
                  Try browsing our <Link to="/products">catalog</Link> for
                  another product.
                </p>
              </div>
            )}
            {products.map(product => (
              <div className="column is-4" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products.all,
  categories: state.categories.all,
  isLoadingCategories: !!state.categories.isLoading
})

const mapDispatch = dispatch => ({
  getProductsByCategory: id => dispatch(fetchProductsByCategory(id)),
  getCategoryChildren: id => dispatch(fetchCategoryChildren(id)),
  getCategory: id => dispatch(fetchCategory(id))
})

export default connect(mapState, mapDispatch)(SpiritsList)
