import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'
import {
  fetchCategory,
  fetchCategoryChildren,
  fetchProducts,
  fetchProductsByCategory
} from '../store'
import {
  CategoryMenu,
  ProductList,
  ProductListBeer,
  ProductListWine,
  ProductListLiquor
} from '../components'

class ProductListView extends Component {
  componentDidMount() {
    this.props.getCategoryChildren()
    this.props.getProducts()
  }

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
      isLoadingCategories
    } = this.props
    return (
      <div>
        <div className="columns">
          <div className="column is-3 is-2-widescreen">
            <CategoryMenu
              category={category}
              categories={categories}
              handleClick={this.handleClick}
              isLoading={isLoadingCategories}
            />
          </div>
          <Switch>
            <Route exact path="/" component={ProductList} />
            <Route exact path="/products" component={ProductList} />
            <Route path="/products/beer" component={ProductListBeer} />
            <Route path="/products/wine" component={ProductListWine} />
            <Route path="/products/liquor" component={ProductListLiquor} />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products.all,
  category: state.categories.active,
  categories: state.categories.all,
  isLoadingCategories: !!state.categories.isLoading
})

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchProducts()),
  getProductsByCategory: id => dispatch(fetchProductsByCategory(id)),
  getCategory: id => dispatch(fetchCategory(id)),
  getCategoryChildren: id => dispatch(fetchCategoryChildren(id))
})

export default withRouter(connect(mapState, mapDispatch)(ProductListView))
