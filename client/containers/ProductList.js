import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchProducts } from '../store'
import { ProductNav, ProductCard } from '../components'

class ProductList extends React.Component {
  async componentDidMount() {
    await this.props.getProducts()
  }

  render() {
    const { products } = this.props
    return (
      <div>
        <h2>All Products</h2>
        <ProductNav />
        <ProductCard />
        {products.map(product => (
          <div key={product.id} style={{ marginBottom: '15px' }}>
            <p>
              <strong>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </strong>
              <br />
              ${product.price}
              <br />
              {product.unitsInStock > 0 ? 'In Stock' : 'Out of Stock!'}
            </p>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products.all
})

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(ProductList)
