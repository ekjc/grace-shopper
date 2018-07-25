import React from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../store'

class ProductsList extends React.Component {
  async componentDidMount() {
    await this.props.fetchProducts()
  }

  render() {
    const { products } = this.props
    return (
      <div>
        <h2>All Products</h2>
        {products.map(product => (
          <div key={product.id} style={{ marginBottom: '15px' }}>
            <p>
              <strong>
                <a href={`/products/${product.id}`}>{product.name}</a>
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
  products: state.products.products
})

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(ProductsList)
