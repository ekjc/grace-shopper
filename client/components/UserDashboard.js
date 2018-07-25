import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const { email, isAdmin } = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      {isAdmin && <h4>You are an admin. With great power comes great responsibility.</h4>}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    isAdmin: state.user.isAdmin
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  isAdmin: PropTypes.bool.isRequired
}
