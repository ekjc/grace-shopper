import React, { Component } from 'react'
import { withRouter, Route, Switch, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  fetchCategory,
  fetchCategoryChildren,
  fetchProducts,
  fetchProductsByCategory
} from '../store'
import { ProductNav, ProductCard, CategoryMenu } from '../components'

const getCategoryIdFromName = name => {
  let id
  switch (name) {
    case 'beer':
      id = 1
    case 'wine':
      id = 2
    case 'liquor':
      id = 3
    default:
      id = 0
  }
  return id
}

class ProductList extends Component {
  constructor() {
    super()
    this.state = {
      categoryName: ''
    }
  }

  // componentWillMount() {
  //   this.setState({ categoryName: this.props.match.params.categoryName })
  //   const id = getCategoryIdFromName(this.state.categoryName)
  //   this.props.getProductsByCategory(id)
  // }

  async componentDidMount() {
    await this.props.getCategoryChildren()
    await this.props.getProducts()
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps === undefined) return false

  //   const categoryName = this.state.categoryName

  //   if (categoryName !== this.props.match.params.categoryName) {

  //     const id = getCategoryIdFromName(categoryName)
  //     this.props.getProductsByCategory(id)
  //     this.setState({ categoryName: this.props.match.params.categoryName })
  //   }
  // }

  handleClick = (event, category) => {
    event.preventDefault()
    this.props.getCategory(category.id)
    this.props.getCategoryChildren(category.id)
    this.props.getProductsByCategory(category.id)
  }

  render() {
    const {
      category,
      categories,
      products,
      isLoadingProducts,
      isLoadingCategories
    } = this.props
    return (
      <div>
        <h1 className="title is-1">{category.name || 'All Products'}</h1>
        <div className="columns">
          <div className="column is-3">
            <CategoryMenu
              categories={categories}
              handleClick={this.handleClick}
              isLoading={isLoadingCategories}
            />
          </div>
          <div className="column is-9">
            <div className="columns is-multiline">
              {!products.length && (
                <div className="content">
                  <h3>No products available in this category</h3>
                  <p>Try browsing our <Link to="/products">catalog</Link> for another product.</p>
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
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products.all,
  category: state.categories.active,
  categories: state.categories.all,
  isLoadingProducts: !!state.products.isLoading,
  isLoadingCategories: !!state.categories.isLoading,
})

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchProducts()),
  getProductsByCategory: id => dispatch(fetchProductsByCategory(id)),
  getCategory: id => dispatch(fetchCategory(id)),
  getCategoryChildren: id => dispatch(fetchCategoryChildren(id))
})

export default (connect(mapState, mapDispatch)(ProductList))
