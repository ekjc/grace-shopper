import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchReviews, deleteReview } from '../store'
import { ReviewRow } from '../components'

class ManageReviews extends Component {
  componentDidMount() {
    this.props.getReviews()
  }

  handleDelete = (event, review) => {
    event.preventDefault()
    this.props.deleteReview(review)
  }

  render() {
    const { reviews, isLoading, deleteReview } = this.props

    if (isLoading) return null

    return (
      <div>
        <h2 className="title is-3">Reviews</h2>
        <table className="table is-fullwidth is-striped">
          <colgroup>
            <col style={{ width: '8%' }} />
            <col style={{ width: '8%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '8%' }} />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Rating</th>
              <th scope="col">Subject</th>
              <th scope="col">Product</th>
              <th scope="col">User Id</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {reviews.map(review => (
              <ReviewRow
                key={review.id}
                review={review}
                deleteReview={this.handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  isLoading: !!state.reviews.isLoading,
  reviews: state.reviews.all
})

const mapDispatch = dispatch => ({
  getReviews: () => dispatch(fetchReviews()),
  deleteReview: review => dispatch(deleteReview(review))
})

export default connect(mapState, mapDispatch)(ManageReviews)

/**
 * PROP TYPES
 */
ManageReviews.propTypes = {
  reviews: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
}
