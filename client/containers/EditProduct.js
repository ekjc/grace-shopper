import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { fetchProduct, updateProduct, removeActiveProduct } from '../store'
import { ValidateField, validateProduct } from '../components';


class EditProduct extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.productId)
  }

  handleSubmit = values => {
    const { name, price, SKU, unitsInStock, description, imageUrl } = values
    this.props.updateProduct({
      id: this.props.match.params.productId,
      name, price, SKU, unitsInStock, description, imageUrl
    })
  }

  goBack = () => {
    this.props.removeActiveProduct()
    this.props.history.goBack()
  }

  render() {
    const { product, pristine, reset, submitting } = this.props
    return (
      <div>
        <h1 className="title is-2">Edit Product</h1>
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <Field
            label="Name"
            name="name"
            type="text"
            component={ValidateField}
          />

          <Field
            label="SKU"
            name="SKU"
            type="text"
            component={ValidateField}
          />

          <Field
            label="Price"
            name="price"
            type="number"
            min={0}
            step={0.01}
            component={ValidateField}
          />

          <Field
            label="Units"
            name="unitsInStock"
            type="number"
            min={0}
            step={1}
            placeholder="Number of units in stock"
            component={ValidateField}
          />

          <Field
            label="Description"
            name="description"
            type="textarea"
            rows={8}
            component={ValidateField}
          />

          <Field
            label="Image URL"
            name="imageUrl"
            type="text"
            placeholder="http://"
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
      </div>
    )
  }
}


EditProduct = reduxForm({
  form: 'editProduct',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate: validateProduct
})(EditProduct)

const mapState = ({ products }) => {
  const { active: product } = products;
  return {
    product: product,
    initialValues: {
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price,
      SKU: product.SKU,
      unitsInStock: product.unitsInStock,
      isFeatured: product.isFeatured,
      isActive: product.isActive
    }
  }
}

const mapDispatch = dispatch => ({
  getProduct: productId => dispatch(fetchProduct(productId)),
  updateProduct: product => dispatch(updateProduct(product)),
  removeActiveProduct: () => dispatch(removeActiveProduct())
})

export default connect(mapState, mapDispatch)(EditProduct)

EditProduct.propTypes = {
  getProduct: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired
}
