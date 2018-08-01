import React, { Component } from 'react'
import axios from 'axios'
import { Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchProduct, createCartItem } from '../store'
import Reviews from './Reviews'

class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      qtyToAdd: 1
    }
  }

  componentDidMount() {
    this.props.getProduct(this.props.match.params.productId)
  }

  handleChange = event => {
    this.setState({ [event.target.name]: +[event.target.value] })
  }

  render() {
    const {
      product,
      isLoading,
      isAdmin,
      match: { params: { productId } }
    } = this.props
    return (
      <div>
        <div className="columns">
          <div className="column is-one-third">
            <img src={product.imageUrl} />
          </div>
          <div className="column">
            <h1 className="title is-1" style={{ marginBottom: '0.75rem' }}>
              {product.name}
            </h1>
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <p className="is-size-4 has-text-weight-bold">
                    {product.price > 0 ? `$${product.price}` : 'Free!'}
                  </p>
                </div>
                <div className="level-item is-size-7">
                  <div
                    className={`is-size-7 ${
                      product.unitsInStock > 0
                        ? 'has-text-success'
                        : 'has-text-danger'
                    }`}
                  >
                    <span
                      className="icon is-small"
                      style={{ margin: '0 .25rem' }}
                    >
                      <i
                        className={`fas ${
                          product.unitsInStock > 0
                            ? 'fa-check-circle'
                            : 'fa-exclamation-circle'
                        }`}
                      />
                    </span>
                    <span>
                      {product.unitsInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="level-right">
                <span className="is-size-7 has-text-grey-light">
                  # {product.SKU}
                </span>
              </div>
            </div>
            <hr />
            <div className="content">
              {product.unitsInStock > 0 ? (
                <div className="field is-horizontal">
                  <div
                    className="field-label is-normal has-text-left"
                    style={{ flexGrow: '0', marginRight: '1rem' }}
                  >
                    <label htmlFor="qtyToAdd" className="label">
                      Qty:
                    </label>
                  </div>
                  <div className="field-body" style={{ flexGrow: 0 }}>
                    <div className="field">
                      <p className="control">
                        <input
                          onChange={this.handleChange}
                          type="number"
                          className="input"
                          value={this.state.qtyToAdd}
                          name="qtyToAdd"
                          id="qtyToAdd"
                          min={1}
                          max={product.unitsInStock}
                          style={{ width: '4rem' }}
                        />
                      </p>
                    </div>
                    <div className="field">
                      <button
                        type="submit"
                        className="button is-secondary"
                        onClick={() =>
                          this.props.addToCart(
                            this.props.myId || `guest`,
                            +productId,
                            this.state.qtyToAdd
                          )
                        }
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="notification">
                  This product is currently unavailable to order.
                </div>
              )}
              <p style={{ marginTop: '1.5rem' }}>{product.description}</p>
            </div>
          </div>
        </div>

        <Link to={`/manage/product/${product.id}`}>
          <button type="button">Edit Product</button>
        </Link>
        <Link
          to={{
            pathname: '/review/add',
            state: { product: product }
          }}
        >
          <button type="button">Add A Review</button>
        </Link>
        <Reviews productId={this.props.match.params.productId} />
      </div>
    )
  }
}

const mapState = state => ({
  isLoading: state.products.isLoading,
  isAdmin: state.me.isAdmin,
  product: state.products.active,
  myId: state.me.id
})

const mapDispatch = dispatch => ({
  getProduct: productId => dispatch(fetchProduct(productId)),
  addToCart: (orderId, productId, qty) =>
    dispatch(createCartItem(orderId, productId, qty))
})

export default connect(mapState, mapDispatch)(Product)
