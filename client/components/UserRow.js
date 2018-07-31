import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const UserRow = ({ user, deleteUser }) => (
  <tr>
    <td>{user.id}</td>
    <td>
      <Link to={`/manage/user/${user.id}`}>
        {user.firstName} {user.lastName}
      </Link>
    </td>
    <td className="is-size-7 has-text-grey-dark">{user.email}</td>
    <td className="is-size-7 has-text-grey-dark">{new Date(user.createdAt).toLocaleDateString()}</td>
    <td className="is-size-7 has-text-grey-dark">{user.isAdmin ? 'Admin' : 'Customer'}</td>
    <td>
      <div className="field is-grouped is-pulled-right">
        <p className="control">
          <Link
            to={`/manage/user/${user.id}`}
            className="button is-link is-small"
          >
            Edit
          </Link>
        </p>
        <p className="control">
          <a
            href="#"
            onClick={event => deleteUser(event, user)}
            className="button is-danger is-small"
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
