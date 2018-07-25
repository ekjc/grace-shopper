import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.id} style={{ marginBottom: '15px' }}>
        <Link to={`/manage/users/${user.id}`}>
          <strong>
            {user.firstName} {user.lastName}
          </strong>
        </Link>
        <br />Email: {user.email}
        <br />Admin: {user.isAdmin.toString()}
      </li>
    ))}
  </ul>
)

export default UserList
