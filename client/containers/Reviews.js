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
          const { id, subject, content, rating } = review
          return (
            <div key={id} style={{ marginBottom: '1rem' }}>
              {subject && <h5 className="title is-5">{subject}</h5>}
              <p className="subtitle is-6">Rating: {rating} stars</p>
              <p>{content}</p>
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
