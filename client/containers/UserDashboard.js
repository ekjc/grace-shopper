import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

/**
 * COMPONENT
 */
class UserDashboard extends Component {
  render() {
    const { id, firstName, lastName, email, isAdmin } = this.props.me
    return (
      <div>
        <h1 className="title is-1">My Account</h1>
        <p className="subtitle is-4">Welcome, {firstName ? firstName : email}!</p>
        <div className="box">
          <div className="content">
            <ul>
              <li>
                <Link to={`/user/${id}/profile`}>
                  My Profile
                </Link>
              </li>
              <li>
                <Link to={`/user/${id}/orders`}>
                  My Orders
                </Link>
              </li>
              <li>
                <Link to={`/user/${id}/reviews`}>
                  My Reviews
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {isAdmin && (
          <div className="box">
            <div className="notification">
              You are an admin, and with great power comes great responsibility.
            </div>
            <Link to="/manage" className="button is-large is-secondary">Manage</Link>
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
