import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const UserRow = ({ user, deleteUser }) => (
  <tr>
    <td>
      <Link to={`/manage/users/${user.id}`}>
        {user.firstName} {user.lastName}
      </Link>
    </td>
    <td>
      {user.email}
    </td>
    <td>
      {new Date(user.createdAt).toLocaleDateString()}
    </td>
    <td>
      {user.isAdmin ? 'Admin' : 'Customer'}
    </td>
    <td>
      <div className="field is-grouped">
        <p className="control">
          <Link to={`/manage/users/${user.id}`} className="button is-info">
            Edit
          </Link>
        </p>
        <p className="control">
          <a
            href="#"
            onClick={event => deleteUser(event, user)}
            className="button is-danger"
          >
            Delete
          </a>
        </p>
      </div>
    </td>
  </tr>
)

export default UserRow

UserRow.propTypes = {
  user: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired
}
