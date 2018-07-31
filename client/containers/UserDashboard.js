import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ManageMenu } from '../components'

/**
 * COMPONENT
 */
class UserDashboard extends Component {
  render() {
    const { firstName, lastName, email, isAdmin } = this.props.me
    return (
      <div>
        <h1 className="title is-1">My Account</h1>
        <p className="subtitle is-4">Welcome, {firstName}!</p>
        <ul>
          <li><Link to={`/reviews/user/${this.props.me.id}`}>Manage Reviews</Link></li>
          <li><Link to={`/orders/orderhistory/${this.props.me.id}`}>Order History</Link></li>
        </ul>
        <p className="subtitle is-4">Welcome, {firstName ? firstName : email}!</p>
        {isAdmin && (
          <div className="box">
            <div className="notification">
              You are an admin, and with great power comes great responsibility.
            </div>
            <ManageMenu />
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
