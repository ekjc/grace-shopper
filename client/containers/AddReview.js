import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { createReview } from '../store'
import { ValidateField, validateReview } from '../components';

class AddReview extends Component {
  handleSubmit = values => {
    const { rating, subject, content } = values
    const { myId, addReview, location } = this.props
    addReview({ subject, content, rating }, myId, location.state.product.id)
  }

  goBack = () => {
    this.props.history.goBack()
  }

  render() {
    const { location, pristine, submitting, reset } = this.props
    return (
      <div>
        <h1 className="title is-1">Add a Review</h1>
        <p className="subtitle">What did you think of {location.state.product.name}?</p>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <Field
            label="Rating"
            name="rating"
            type="text"
            component={ValidateField}
          />

          <Field
            label="Title"
            name="subject"
            type="text"
            component={ValidateField}
          />

          <Field
            label="Content"
            name="content"
            type="textarea"
            rows={8}
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
              <button type="button" className="button is-light" onClick={this.goBack}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

AddReview = reduxForm({
  form: 'addReview',
  validate: validateReview
})(AddReview)

const mapState = state => ({
  myId: state.me.id
})

const mapDispatch = dispatch => ({
  addReview: (review, userId, productId) =>
    dispatch(createReview(review, userId, productId))
})

export default connect(mapState, mapDispatch)(AddReview)
