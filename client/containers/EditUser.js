import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { getUser } from '../store'


class EditUser extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.userId)
  }

  render() {
    const { user } = this.props;

    if (!user.id) return null;

    return (
      <div>
        <h3>{user.firstName} {user.lastName}</h3>
        <p>
          Email: {user.email}<br />
          Phone: {user.phone}<br />
          Admin: {user.isAdmin.toString()}
        </p>
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  getUser: userId => dispatch(getUser(userId))
})

export default connect(mapState, mapDispatch)(EditUser)
