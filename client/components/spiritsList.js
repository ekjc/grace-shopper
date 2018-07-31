import React from 'react'
import { Link } from 'react-router-dom'
import { ProductCard } from './index'

const SpiritsList = props => {
  const { products } = props
  return (
    <div className="column is-9">
      <div className="columns is-multiline">
        {!products.length && (
          <div className="content">
            <h3>No products available in this category</h3>
            <p>
              Try browsing our <Link to="/products">catalog</Link> for another
              product.
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
  )
}

export default SpiritsList
