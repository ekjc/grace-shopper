import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const OrderRow = ({ order }) => (
  <tr>
    <td>{order.id}</td>
    <td>
      <Link to={`/manage/order/${order.id}`}>
        {order.number}
      </Link>
    </td>
    <td>{order.date}</td>
    <td>{order.email}</td>
    <td>{order.phone}</td>
    <td>
      <div className="field is-grouped is-pulled-right">
        <p className="control">
          <Link
            to={`/manage/order/${order.id}`}
            className="button is-link is-small"
          >
            Edit
          </Link>
        </p>
        <p className="control">
          <a
            href="#"

            className="button is-danger is-small"
          >
            Delete
          </a>
        </p>
      </div>
    </td>
  </tr>
)

export default OrderRow

OrderRow.propTypes = {
  order: PropTypes.object.isRequired,
  // deleteProduct: PropTypes.func.isRequired
}
