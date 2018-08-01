import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { fetchUser, updateUser, removeActiveUser } from '../store'
import { ValidateField, validateUser } from '../components';

class UserProfile extends Component {
  componentDidMount() {
    // this.props.getUser(this.props.match.params.userId)
  }

  handleSubmit = values => {
    const { firstName, lastName, email, phone } = values;
    this.props.updateUser({
      id: this.props.match.params.userId,
      firstName, lastName, email, phone
    })
  }

  goBack = () => {
    this.props.history.goBack()
  }

  render() {
    const { user, pristine, reset, submitting } = this.props
    return (
      <div>
        <h2 className="title is-3">My Profile</h2>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>

          <Field
            label="First name"
            name="firstName"
            type="text"
            component={ValidateField}
          />

          <Field
            label="Last name"
            name="lastName"
            type="text"
            component={ValidateField}
          />

          <Field
            label="Email"
            name="email"
            type="email"
            component={ValidateField}
          />

          <Field
            label="Phone"
            name="phone"
            type="tel"
            component={ValidateField}
          />

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

UserProfile = reduxForm({
  form: 'editUser',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate: validateUser
})(UserProfile)

const mapState = ({ me }) => {
  return {
    me: me,
    initialValues: {
      firstName: me.firstName,
      lastName: me.lastName,
      email: me.email
    }
  }
}

const mapDispatch = dispatch => ({
  // getUser: userId => dispatch(fetchUser(userId)),
  updateUser: user => dispatch(updateUser(user)),
  // removeActiveUser: () => dispatch(removeActiveUser())
})

export default connect(mapState, mapDispatch)(UserProfile)

UserProfile.propTypes = {
  // getUser: PropTypes.func.isRequired,
  // updateUser: PropTypes.func.isRequired
}
