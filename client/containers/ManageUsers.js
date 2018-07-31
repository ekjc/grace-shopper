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
        <h2 className="title is-3">Users</h2>
        <table className="table is-fullwidth is-striped">
          <colgroup>
            <col style={{ width: '8%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '15%' }} />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">ID</th>
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
  isLoading: !!state.users.isLoading,
  isAdmin: !!state.me.isAdmin,
  myId: state.me.id,
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
  isLoading: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  myId: PropTypes.number,
  users: PropTypes.array.isRequired,
}
