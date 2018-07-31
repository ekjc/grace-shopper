import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { fetchCategory, updateCategory, removeActiveCategory } from '../store'
import { ValidateField, validateCategory } from '../components';

class EditCategory extends Component {
  componentDidMount() {
    this.props.getCategory(this.props.match.params.categoryId)
  }

  handleSubmit = values => {
    const { name, parentId } = values;
    this.props.updateCategory({
      id: this.props.match.params.categoryId,
      parentId, name
    })
  }

  goBack = () => {
    this.props.removeActiveCategory()
    this.props.history.goBack()
  }

  render() {
    const { category, pristine, reset, submitting } = this.props
    return (
      <div>
        <h1 className="title is-2">Edit Category</h1>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>

          <Field
            label="Name"
            name="name"
            type="text"
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

EditCategory = reduxForm({
  form: 'editCategory',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate: validateCategory
})(EditCategory)

const mapState = ({ categories }) => {
  const { active: category } = categories;
  console.log('category', category)
  return {
    category: category,
    initialValues: {
      name: category.name
    }
  }
}

const mapDispatch = dispatch => ({
  getCategory: categoryId => dispatch(fetchCategory(categoryId)),
  updateCategory: category => dispatch(updateCategory(category)),
  removeActiveCategory: () => dispatch(removeActiveCategory())
})

export default connect(mapState, mapDispatch)(EditCategory)

EditCategory.propTypes = {
  getCategory: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired
}
