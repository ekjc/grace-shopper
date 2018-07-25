import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        {name === 'signup' && (
          <div>
            <label htmlFor="firstName">
              <small>First name</small>
            </label>
            <input name="firstName" type="text" />
          </div>
        )}
        {name === 'signup' && (
          <div>
            <label htmlFor="lastName">
              <small>Last name</small>
            </label>
            <input name="lastName" type="text" />
          </div>
        )}
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="email" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      {/* <a href="/auth/google">{displayName} with Google</a> */}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   for Login and for Signup. However, they share the same 'mapDispatch'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(event) {
      event.preventDefault()
      const formName = event.target.name
      const formData = {
        email: event.target.email.value,
        password: event.target.password.value
      }
      if (formName === 'signup') {
        formData.firstName = event.target.firstName.value
        formData.lastName = event.target.lastName.value
      }
      dispatch(auth(formData, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
