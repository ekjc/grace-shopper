import React from 'react'
import { connect } from 'react-redux'
import { getReviewsByProductId } from '../store'

class Reviews extends React.Component {

  componentDidMount() {
    const productId = this.props.productId
    this.props.getReviewsByProductId(productId)
  }

  render() {
    console.log('this.props.reviews', this.props.reviews)
    const reviews = this.props.reviews
    return (
        <div>
            <h1>Product Reviews</h1>
            {reviews.map(review => {
             return <div key={review.id}>
                <h3>Subject: {review.subject}</h3>
                <h3>Content: {review.content}</h3>
                <h3>Rating: {review.rating}</h3>
            </div>   
            })}
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    reviews: state.reviews
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getReviewsByProductId: (productId) => {
      dispatch(getReviewsByProductId(productId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews)
