import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { getUsers } from '../store'
import { UserList } from '../components'

/**
 * COMPONENT
 */
export class Manage extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const { email, isAdmin, users } = this.props
    return (
      <div>
        <h2>Manage page</h2>
        <h3>Users</h3>
        <UserList users={users} />
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
