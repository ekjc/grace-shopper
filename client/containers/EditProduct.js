import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { fetchProduct, updateProduct } from '../store'

class EditProduct extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.productId)
  }

  renderField(field) {
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
    const { name, price, SKU, unitsInStock, quantityPerUnit } = values
    this.props.updateProduct({
      id: this.props.match.params.productId,
      name, price, SKU, unitsInStock, quantityPerUnit
    })
  }

  goBack = () => {
    this.props.history.goBack()
  }

  render() {
    const { pristine, submitting, reset } = this.props
    return (
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <h2>Edit Product</h2>
        <Field
          label="Name of Product"
          typeOfInput="text"
          name="name"
          component={this.renderField}
        />
        <Field label="Price" name="price" component={this.renderField} />
        <Field
          label="Description of Product"
          typeOfInput="text"
          name="product"
          component={this.renderField}
        />
        <Field label="SKU" name="SKU" component={this.renderField} />
        <Field
          label="Units in Stock"
          typeOfInput="number"
          name="unitsInStock"
          component={this.renderField}
        />
        <Field
          label="Quantity Per Unit"
          typeOfInput="number"
          name="quantityPerUnit"
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

        {/* <Field
          label="Featured Product"
          type="checkbox"
          name="featuredProduct"
          component="input"
        />
        <Field
          label="Would you like this product to be labeled as active?"
          type="radio"
          name="activeStatus"
          component={this.renderField}
        /> */}

      </form>
    )
  }
}

const validate = values => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Please enter a product name.'
  }
  if (!values.price) {
    errors.price = 'Please enter the price of the product.'
  }
  if (!values.SKU) {
    errors.SKU = 'Please enter the product SKU.'
  }
  if (!values.unitsInStock) {
    errors.unitsInStock = 'Please enter the number of units currently in stock.'
  }
  return errors
}

EditProduct = reduxForm({
  validate,
  form: 'editProductsForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(EditProduct)

const mapState = state => ({
  product: state.products.active,
  initialValues: {
    name: state.products.active.name,
    price: state.products.active.price,
    description: state.products.active.description,
    SKU: state.products.active.SKU,
    unitsInStock: state.products.active.unitsInStock,
    quantityPerUnit: state.products.active.quantityPerUnit
  }
})

const mapDispatch = dispatch => ({
  getProduct: productId => dispatch(fetchProduct(productId)),
  updateProduct: product => dispatch(updateProduct(product))
})

export default connect(mapState, mapDispatch)(EditProduct)