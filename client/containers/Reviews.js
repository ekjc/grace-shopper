import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchReviewsForProduct } from '../store'
import { Link } from 'react-router-dom'

const StarRating = ({ rating }) => {
  if (rating === 5) {
    return (
      <div>
        <span className="icon has-text-warning">
          <i className="fas fa-star" />
        </span>
        <span className="icon has-text-warning">
          <i className="fas fa-star" />
        </span>
        <span className="icon has-text-warning">
          <i className="fas fa-star" />
        </span>
        <span className="icon has-text-warning">
          <i className="fas fa-star" />
        </span>
        <span className="icon has-text-warning">
          <i className="fas fa-star" />
        </span>
      </div>
    )
  }

  if (rating === 4) {
    return (
      <div>
        <span className="icon has-text-warning">
          <i className="fas fa-star" />
        </span>
        <span className="icon has-text-warning">
          <i className="fas fa-star" />
        </span>
        <span className="icon has-text-warning">
          <i className="fas fa-star" />
        </span>
        <span className="icon has-text-warning">
          <i className="fas fa-star" />
        </span>
        <span className="icon has-text-warning">
          <i className="far fa-star" />
        </span>
      </div>
    )
  }

  if (rating === 3) {
    return (
      <div>
        <span className="icon has-text-warning">
          <i className="fas fa-star" />
        </span>
        <span className="icon has-text-warning">
          <i className="fas fa-star" />
        </span>
        <span className="icon has-text-warning">
          <i className="fas fa-star" />
        </span>
        <span className="icon has-text-warning">
          <i className="far fa-star" />
        </span>
        <span className="icon has-text-warning">
          <i className="far fa-star" />
        </span>
      </div>
    )
  }

  if (rating === 2) {
    return (
      <div>
        <span className="icon has-text-warning">
          <i className="fas fa-star" />
        </span>
        <span className="icon has-text-warning">
          <i className="fas fa-star" />
        </span>
        <span className="icon has-text-warning">
          <i className="far fa-star" />
        </span>
        <span className="icon has-text-warning">
          <i className="far fa-star" />
        </span>
        <span className="icon has-text-warning">
          <i className="far fa-star" />
        </span>
      </div>
    )
  }

  if (rating === 1) {
    return (
      <div>
        <span className="icon has-text-warning">
          <i className="fas fa-star" />
        </span>
        <span className="icon has-text-warning">
          <i className="far fa-star" />
        </span>
        <span className="icon has-text-warning">
          <i className="far fa-star" />
        </span>
        <span className="icon has-text-warning">
          <i className="far fa-star" />
        </span>
        <span className="icon has-text-warning">
          <i className="far fa-star" />
        </span>
      </div>
    )
  }

  return null
}

class Reviews extends Component {
  componentDidMount() {
    this.props.getReviews(this.props.productId)
  }

  render() {
    const { reviews, product } = this.props
    console.log('this.props', this.props)
    return (
      <div>
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <h3 className="title is-3 is-marginless">Product Reviews</h3>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <Link
                to={{
                  pathname: '/review/add',
                  state: { product: product }
                }}
                className="button is-light"
              >
                Add A Review
              </Link>
            </div>
          </div>
        </div>

        <div className="columns">
          {!reviews && <p>No reviews for this product</p>}
          {reviews.map(review => {
            const { id, subject, content, rating } = review
            return (
              <div key={id} className="column is-3">
                <div className="box" style={{ height: '100%' }}>
                  <StarRating rating={rating} />
                  {subject && <h4 className="title is-6" style={{ marginTop: '.75rem' }}>{subject}</h4>}
                  {content && <p>{content}</p>}
                  {review.user && <p className="is-size-7">— {review.user.email}</p>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  reviews: state.reviews.all,
  product: state.products.active
})

const mapDispatch = dispatch => ({
  getReviews: productId => dispatch(fetchReviewsForProduct(productId))
})

export default connect(mapState, mapDispatch)(Reviews)
