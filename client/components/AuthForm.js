import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { auth } from '../store'

const AuthForm = ({ name, displayName, linkName, linkDisplayName, subtitle, handleSubmit, error }) => (
  <div>
    <h1 className="title is-3">{displayName}</h1>
    <p className="subtitle is-5">{subtitle}</p>
    <div className="box">
      <form onSubmit={handleSubmit} name={name}>
        {name === 'signup' && (
          <div className="field">
            <label htmlFor="firstName" className="label has-text-left">
              First Name
            </label>
            <input name="firstName" type="text" className="input" />
          </div>
        )}
        {name === 'signup' && (
          <div className="field">
            <label htmlFor="lastName" className="label has-text-left">
              Last Name
            </label>
            <input name="lastName" type="text" className="input" />
          </div>
        )}
        <div className="field">
          <label htmlFor="email" className="label has-text-left">
            Email
          </label>
          <input name="email" type="email" className="input" />
        </div>
        <div className="field">
          <label htmlFor="password" className="label has-text-left">
            Password
          </label>
          <input name="password" type="password" className="input" />
        </div>
        <div className="field">
          <button
            type="submit"
            className="button is-block is-link is-large is-fullwidth"
          >
            {displayName}
          </button>
          {error && error.response && <p className="help is-danger has-text-left">{error.response.data}</p>}
        </div>
      </form>
    </div>
    <p className="has-text-grey">
      <Link to={`/${linkName}`}>{linkDisplayName}</Link>&nbsp;·&nbsp;
      {/* <Link to="/auth/google">{displayName} with Google</Link> */}
      <a href="/auth/google">{displayName} with Google</a>
    </p>
  </div>
)

const mapLogin = state => ({
  name: 'login',
  displayName: 'Login',
  subtitle: 'Please log in to proceed',
  linkName: 'signup',
  linkDisplayName: 'Sign Up',
  error: state.me.error
})

const mapSignup = state => ({
  name: 'signup',
  displayName: 'Sign Up',
  subtitle: 'Create an account',
  linkName: 'login',
  linkDisplayName: 'Login',
  error: state.me.error
})

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

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
