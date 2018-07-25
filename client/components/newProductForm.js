import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import {createNewProduct} from '../store/newProductsForm_reducer'

class productForm extends Component {
  renderField(field) {
    const {meta: {touched, error}} = field
    return (
      <div className="form-group">
        <h2>Add a New Product</h2>
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

  onSubmit(values) {
    //this is where we define what we want to do with the data once it is submitted. It passes us the values out of the form so we have something to work with
    console.log(values)
  }

  render() {
    const {pristine, submitting, handleSubmit, reset} = this.props
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
          typeOfInput="number" //double check
          name="unitsInStock"
          component={this.renderField}
        />
        <Field
          label="Quantity Per Unit"
          typeOfInput="number" //Again double check
          name="quantityPerUnit"
          component={this.renderField}
        />
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
        {/* <Field
            label="Would you like this to be the featured product?"
            type="radio"
            name="featuredProduct"
            component={this.renderField}
          />
          <Field
            label="Would you like this product to be labeled as active?"
            type="radio"
            name="activeStatus"
            component={this.renderField}
          />
*/}
      </form>
    )
  }
}

const validate = values => {
  //values corresponds to the values that the user inputs on the form itself (whole object)
  const errors = {}

  if (!values.name || typeof values.name !== 'string') {
    errors.name = 'Please enter a product name.'
  }
  if (!values.price || typeof values.price !== 'number') {
    errors.price = 'Please enter the price of the product.'
  }
  if (!values.SKU || typeof values.SKU !== 'number') {
    errors.SKU = 'Please enter the product SKU.'
  }
  if (!values.unitsInStock || typeof values.unitsInStock !== 'number') {
    errors.unitsInStock = 'Please enter the number of units currently in stock.'
  }
  return errors
}

export default reduxForm({
  validate,
  form: 'newProductsForm' //this string needs to be unique so that forms don't merge
})(productForm)

//1. In combineReducers in store/index add  (wiring up redux form)
//import { reducer as formReducer } from 'redux-form'
//const reducer = combineReducers({
// form: formReducer
//})

//2. Route...need to decide on a route and add the route through Link

const mapDispatch = dispatch => ({
  createNewProduct:
})
