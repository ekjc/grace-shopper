import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { getUser, editUser, loadUserData } from '../store'

class EditUser extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.userId)
  }

  handleSubmit = data => {
    const { firstName, lastName, email, isAdmin } = data;
    this.props.updateUser({
      id: this.props.match.params.userId,
      firstName, lastName, email, isAdmin
    })
  }

  goBack = () => {
    this.props.history.goBack()
  }

  render() {
    const { user, pristine, reset, submitting } = this.props
    console.log('all props', this.props)
    return (
      <div>
        <h3>Edit User</h3>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <div className="field">
            <label htmlFor="firstName" className="label">
              First Name
            </label>
            <Field
              className="input"
              name="firstName"
              component="input"
              type="text"
            />
          </div>
          <div className="field">
            <label htmlFor="lastName" className="label">
              Last Name
            </label>
            <Field
              className="input"
              name="lastName"
              component="input"
              type="text"
            />
          </div>
          <div className="field">
            <label htmlFor="email" className="label">
              Email
            </label>
            <Field
              className="input"
              name="email"
              component="input"
              type="email"
            />
          </div>
          <div className="field">
            <label htmlFor="isAdmin" className="label">
              Admin
            </label>
            <Field
              className="input"
              name="isAdmin"
              component="input"
              type="checkbox"
            />{' '}
            Yes
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button
                type="submit"
                className="button is-link"
                disabled={pristine || submitting}
              >
                Submit
              </button>
            </div>
            <div className="control">
              <button type="button" className="button is-light" onClick={reset}>
                Reset
              </button>
            </div>
            <div className="control">
              <button
                type="button"
                className="button is-light"
                onClick={this.goBack}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

EditUser = reduxForm({
  form: 'editUser',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(EditUser)

const mapState = ({ user }) => {
  return {
    user: user,
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin
    }
  }
}

const mapDispatch = dispatch => ({
  getUser: userId => dispatch(getUser(userId)),
  updateUser: user => dispatch(editUser(user))
})

export default connect(mapState, mapDispatch)(EditUser)

EditUser.propTypes = {
  getUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired
}
