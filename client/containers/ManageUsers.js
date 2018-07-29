import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUsers, deleteUser, logout } from '../store'
import { UserRow } from '../components'

class ManageUsers extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  handleDelete = (event, user) => {
    event.preventDefault()

    const { myId, deleteUser } = this.props

    if (user.id === myId) {
      if (confirm('You are about to delete yourself! Are you sure?')) {
        deleteUser(user)
      }
      return null;
    }

    deleteUser(user)
  }

  render() {
    const { users, isLoading, isAdmin, deleteUser } = this.props

    if (isLoading) return null

    return (
      <div>
        <h1 className="title is-2">Manage Users</h1>
        <table className="table is-fullwidth is-striped">
          <colgroup>
            <col style={{ width: '25%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '15%' }} />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Joined</th>
              <th scope="col">Role</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <UserRow
                key={user.id}
                user={user}
                deleteUser={this.handleDelete}
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
  isLoading: state.me.isLoading,
  isAdmin: state.me.isAdmin,
  users: state.users.all,
  myId: state.me.id
})

const mapDispatch = dispatch => ({
  getUsers: () => dispatch(fetchUsers()),
  deleteUser: user => dispatch(deleteUser(user)),
  handleClick: () => dispatch(logout())
})

export default connect(mapState, mapDispatch)(ManageUsers)

/**
 * PROP TYPES
 */
ManageUsers.propTypes = {
  isAdmin: PropTypes.bool
}
