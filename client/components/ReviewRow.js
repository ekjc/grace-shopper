import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ReviewRow = ({ review, deleteReview }) => (
  <tr>
    <td>{review.id}</td>
    <td>{review.rating}</td>
    <td>{review.subject}</td>
    <td>{review.product.name}</td>
    <td>{review.userId}</td>
    <td style={{ justifyContent: 'flex-end' }}>
      <div className="field is-grouped is-pulled-right">
        <p className="control">
          <Link
            to={`/manage/review/${review.id}`}
            className="button is-link is-small"
          >
            Edit
          </Link>
        </p>
        <p className="control">
          <a
            href="#"
            onClick={event => deleteReview(event, review)}
            className="button is-danger is-small"
          >
            Delete
          </a>
        </p>
      </div>
    </td>
  </tr>
)

export default ReviewRow

ReviewRow.propTypes = {
  review: PropTypes.object.isRequired,
  deleteReview: PropTypes.func.isRequired
}
