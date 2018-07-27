import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { createReview } from '../store'

class ReviewForm extends Component {
  renderField = field => {
    const { meta: { touched, error } } = field
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className="form-control"
          type={field.typeOfInput}
          {...field.input}
        />
        {touched ? error : ''}
      </div>
    )
  }

  handleSubmit = values => {
    const { subject, content, rating } = values
    this.props.createReview({
      id: this.props.match.params.productId,
      subject, content, rating
    })
  }

  goBack = () => {
    this.props.history.goBack()
  }

  render() {
      const { pristine, submitting, reset } = this.props
    return (
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Field
          label="Subject"
          typeOfInput="text"
          name="subject"
          component={this.renderField}
        />

        <Field
          typeOfInput="text"
          label="Content"
          name="content"
          component={this.renderField}
        />
        <Field
          typeOfInput="number"
          label="Rating"
          name="rating"
          component={this.renderField}
        />
        <button
          type="submit"
          disabled={pristine || submitting}
          onClick={this.goBack}
        >
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
        <button
          type="button"
          onClick={this.goBack}
        >
          Cancel
        </button>
      </form>
    )
  }
}

const validate = values => {
  const errors = {}

  if (!values.subject) {
    errors.name = 'Please enter a subject.'
  }
  if (!values.content) {
    errors.price = 'Please enter your content.'
  }
  if (!values.rating) {
    errors.rating = 'Please enter a value between 1 and 5'
  }
  return errors
}

ReviewForm = reduxForm({
  form: 'addReview',
  validate
})(ReviewForm)

const mapDispatch = dispatch => ({
  addReview: () => dispatch(createReview())
})

export default connect(null, mapDispatch)(ReviewForm)
