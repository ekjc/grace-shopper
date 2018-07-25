import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { UserList } from '../components'

/**
 * COMPONENT
 */
class UserDashboard extends Component {
  render() {
    const { firstName, lastName, email, isAdmin } = this.props.me
    return (
      <div>
        <h3>Welcome, {firstName}!</h3>
        {isAdmin && (
          <div>
            <h4>
              You are an admin, and with great power comes great responsibility.
            </h4>
            <ul>
              <li><Link to="/manage/users">Manage Users</Link></li>
              <li><Link to="/manage/products">Manage Products</Link></li>
            </ul>
          </div>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  me: state.me,
  email: state.me.email,
  isAdmin: state.me.isAdmin
})

export default connect(mapState)(UserDashboard)

/**
 * PROP TYPES
 */
UserDashboard.propTypes = {
  email: PropTypes.string,
  isAdmin: PropTypes.bool.isRequired
}
