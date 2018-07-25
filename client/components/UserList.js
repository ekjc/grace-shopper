import React from 'react'

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.id} style={{ marginBottom: '15px' }}>
        <a href={`/manage/users/${user.id}`}>
          <strong>
            {user.firstName} {user.lastName}
          </strong>
        </a>
        <br />Email: {user.email}
        <br />Admin: {user.isAdmin.toString()}
      </li>
    ))}
  </ul>
)

export default UserList
