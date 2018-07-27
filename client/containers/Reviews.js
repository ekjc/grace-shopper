import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchReviewsForProduct } from '../store'
import { Link } from 'react-router-dom'

class Reviews extends Component {
  componentDidMount() {
    this.props.getReviews(this.props.productId)
  }

  render() {
    const reviews = this.props.reviews
    return (
      <div>
        <h1>Product Reviews</h1>
        {reviews.map(review => {
          return (
            <div key={review.id}>
              <h3>Subject: {review.subject}</h3>
              <h3>Content: {review.content}</h3>
              <h3>Rating: {review.rating}</h3>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => ({
  reviews: state.reviews.all
})

const mapDispatch = dispatch => ({
  getReviews: productId => dispatch(fetchReviewsForProduct(productId))
})

export default connect(mapState, mapDispatch)(Reviews)
