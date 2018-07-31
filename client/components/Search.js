import React from 'react';
import { Link } from 'react-router-dom'

export const Search = ({ product }) => (
  <div className="card">
    <div className="card-image">
      <figure className="image is-2by3">
        <Link to={`/product/${product.id}`}>
          <img src={product.imageUrl} />
        </Link>
      </figure>
    </div>
    <div className="card-content">
      <div className="content">
        <h3 className="title is-6">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p>{product.price > 0 ? `$${product.price}` : `Free!`}</p>
        <p>{product.unitsInStock > 0 ? 'In Stock' : 'Out of Stock!'}</p>
      </div>
    </div>
  </div>
)

export default ProductCard