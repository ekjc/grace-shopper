import React from 'react'
import { connect } from 'react-redux'
import { fetchProductsByCategory, fetchProducts } from '../store'
import { NavTabs } from './NavTabs'

class ProductNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCategory: ''
    }
  }

  handleNavTabs = event => {
    const value = event.target.getAttribute('value')
    this.setState({ [event.target.name]: value })
  }

  render() {
    return (
      <div>
        <a
          href="#"
          style={{ margin: '15px' }}
          name="selectedCategory"
          value="all"
          onClick={event => {
            this.props.fetchProducts()
            this.handleNavTabs(event)
          }}
        >
          ALL
        </a>
        <a
          href="#"
          style={{ margin: '15px' }}
          name="selectedCategory"
          value="beer"
          onClick={event => {
            this.props.fetchLocalProducts(1)
            this.handleNavTabs(event)
          }}
        >
          BEER
        </a>
        <a
          href="#"
          style={{ margin: '15px' }}
          name="selectedCategory"
          value="wine"
          onClick={event => {
            this.props.fetchLocalProducts(2)
            this.handleNavTabs(event)
          }}
        >
          WINE
        </a>
        <a
          href="#"
          style={{ margin: '15px' }}
          name="selectedCategory"
          value="spirits"
          onClick={event => {
            this.props.fetchLocalProducts(3)
            this.handleNavTabs(event)
          }}
        >
          SPIRITS
        </a>

        <NavTabs props={this.state.selectedCategory} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.products
})

const mapDispatchToProps = dispatch => ({
  fetchLocalProducts: categoryId =>
    dispatch(fetchProductsByCategory(categoryId)),
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductNav)
