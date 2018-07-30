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
        <h3 className="title is-5">Product Reviews</h3>
        {reviews.map(review => {
          const { id, subject, content, rating } = review
          return (
            <div key={id} style={{ marginBottom: '1rem' }}>
              {subject && <h4 className="title is-5">{subject}</h4>}
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
