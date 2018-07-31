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
        <h1 className="title is-2">My Account</h1>
        <p className="subtitle is-4">Welcome, {firstName ? firstName : email}!</p>
        {isAdmin && (
          <div className="content">
            <div className="notification">
              You are an admin, and with great power comes great responsibility.
            </div>
            <ul>
              <li><Link to="/manage/users">Manage Users</Link></li>
              <li><Link to="/manage/products">Manage Products</Link></li>
              <li><Link to="/manage/categories">Manage Categories</Link></li>
              <li><Link to="/manage/reviews">Manage Reviews</Link></li>
              <li><Link to="/manage/orders">Manage Orders</Link></li>
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
  isAdmin: PropTypes.bool
}
