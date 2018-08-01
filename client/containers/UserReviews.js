import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchReviewsByUser } from '../store'


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

class UserReviews extends Component {
  componentDidMount() {
    this.props.fetchReviewsByUser(this.props.match.params.userId)
  }

  render() {
    const { reviews } = this.props
    return (
      <div>
        <h1 className="title is-1">My Reviews</h1>
        <div className="content">
          {reviews.length &&
            reviews.map(review => (
              <div className="box" key={review.id}>
                <div className="level">
                  <div className="level-left">
                    <div className="level-item">
                      <p className="title is-5">
                        {review.product.name}
                      </p>
                    </div>
                    <div className="level-item">
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
                </div>
                {review.subject && (
                  <p className="has-text-weight-bold">{review.subject}</p>
                )}
                {review.content && <p>{review.content}</p>}
              </div>
            ))}
          {!reviews.length && (
            <p className="subtitle is-4">You haven't reviewed anything yet</p>
          )}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  reviews: state.reviews.all,
  userId: state.me.id
})

const mapDispatch = dispatch => ({
  fetchReviewsByUser: userId => dispatch(fetchReviewsByUser(userId))
})

export default connect(mapState, mapDispatch)(UserReviews)
