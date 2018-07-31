import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchReviewsByUser}  from '../store'

class UserReviews extends Component {

  componentDidMount() {
    this.props.fetchReviewsByUser(this.props.match.params.userId)
  }

  render() {
      const reviewsByUser = this.props.reviews.all
    return (
      <div>
          {reviewsByUser.length && reviewsByUser.map(review => (
                    <div key={review.id}> 
                        <h1>{review.subject}</h1>
                        <h1>{review.content}</h1>
                        <h1>{review.rating}</h1>
                        <br/>
                    </div>
          ))}
          {!reviewsByUser.length && <h1>You have left no product reviews!</h1>}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  reviews: state.reviews,
  userId: state.me.id
})

const mapDispatch = dispatch => ({
    fetchReviewsByUser: userId => dispatch(fetchReviewsByUser(userId))
})

export default connect(mapState, mapDispatch)(UserReviews)
