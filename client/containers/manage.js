import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUsers } from '../store'

/**
 * COMPONENT
 */
export class Manage extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const { email, isAdmin, users } = this.props
    console.log('users', users)
    return (
      <div>
        <h3>Manage page</h3>
        <h4>Users</h4>
        <ul>
          {users.map(user => (
            <li key={user.id} style={{ marginBottom: '15px' }}>
              <strong>
                {user.firstName} {user.lastName}
              </strong>
              <br />Email: {user.email}
              <br />Admin: {user.isAdmin.toString()}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    isAdmin: state.user.isAdmin,
    users: state.users
  }
}

const mapDispatch = dispatch => ({
  getUsers: () => dispatch(getUsers())
})

export default connect(mapState, mapDispatch)(Manage)

/**
 * PROP TYPES
 */
Manage.propTypes = {
  email: PropTypes.string,
  isAdmin: PropTypes.bool.isRequired
}
