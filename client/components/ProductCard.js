import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { createCartItem } from '../store'

const ProductCard = ({ product, myId, addToCart }) => (
  <div className="card">
    <Link to={`/product/${product.id}`} className="card-image">
      <div className="see-details">
        <div className="button is-small">
          <span>See details</span>
        </div>
      </div>
      <figure className="image is-2by3">
        <img src={product.imageUrl} />
      </figure>
    </Link>
    <Link
      to={`/product/${product.id}`}
      className="card-content has-text-centered"
    >
      <h2 className="title">{product.name}</h2>
      <p className="price">
        {product.price > 0 ? `$${product.price}` : `Free!`}
      </p>
    </Link>
    <footer className="card-footer">
      <a
        className="card-footer-item"
        onClick={() => addToCart(myId || `guest`, product.id, 1)}
      >
        Add to Cart
      </a>
    </footer>
  </div>
)

const mapState = state => ({
  myId: state.me.id
})

const mapDispatch = dispatch => ({
  addToCart: (orderId, productId, qty) =>
    dispatch(createCartItem(orderId, productId, qty))
})

export default connect(mapState, mapDispatch)(ProductCard)

