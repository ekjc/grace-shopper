import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchUsers, deleteUser } from '../store'
import { UserRow } from '../components'

class ManageUsers extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  handleDelete = (event, user) => {
    event.preventDefault()
    this.props.deleteUser(user)
  }

  render() {
    const { users, isLoading, isAdmin, deleteUser } = this.props

    if (isLoading) return null

    return (
      <div>
        <h2>Manage Users</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Joined</th>
              <th>Role</th>
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
  users: state.users.all
})

const mapDispatch = dispatch => ({
  getUsers: () => dispatch(fetchUsers()),
  deleteUser: user => dispatch(deleteUser(user))
})

export default connect(mapState, mapDispatch)(ManageUsers)

/**
 * PROP TYPES
 */
ManageUsers.propTypes = {
  isAdmin: PropTypes.bool
}
