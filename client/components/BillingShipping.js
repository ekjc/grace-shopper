import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { ValidateField } from './index';

import CompletePurchase from './CompletePurchase'
import Checkout from './Checkout'

class BillingShipping extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleForm: false,
      // firstName: '',
      // lastName: '',
      // email: '',
      // phone: '',
      // street1: '',
      // street2: '',
      // city: '',
      // state: '',
      // zip: ''
    }
  }

  handleToggle = event => {
    event.preventDefault()

    let show = !this.state.toggleForm
    // let show
    // if (this.state.toggleForm === false) {
    //   show = true
    // } else {
    //   show = false
    // }
    this.setState({ [event.target.name]: show })
  }

  // handleChange = event => {
  //   this.setState({ [event.target.name]: event.target.value })
  // }

  // scrollBottom = () => {
  //   window.scrollBy(0, window.innerHeight)
  // }

  handleSubmit = values => {
    const { firstName, lastName, email, phone, street1, street2, city, state, zip } = values
  }

  render() {
    const { cart, sendOrder, pristine, submitting, reset } = this.props
    return (
      <div style={{ marginTop: '2rem' }}>

        <button
          type="button"
          name="toggleForm"
          className={
              this.state.toggleForm ? 'button is-light' : 'button is-link'
            }
          onClick={event => this.handleToggle(event)}>
          Proceed to Checkout
        </button>





        <span>
          {/*<button
            type="button"
            className={
              this.state.toggleForm ? 'button is-light' : 'button is-link'
            }
            name="toggleForm"
            onClick={event => {
              this.handleToggle(event)
              setTimeout(this.scrollBottom, 30)
            }}
          >
            Enter Shipping & Billing Info
          </button>*/}
        </span>
        {this.state.toggleForm && (
          <div>
            <hr />
            <form>
              <h2 className="title is-4">
                Shipping Information
              </h2>
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
                placeholder="email@example.com"
                component={ValidateField}
              />
              <Field
                label="Phone"
                name="phone"
                type="text"
                component={ValidateField}
              />
              <Field
                label="Street address"
                name="street1"
                type="text"
                placeholder="Street and number, P.O. box, etc."
                component={ValidateField}
              />
              <Field
                label="Unit number"
                name="street2"
                type="text"
                placeholder="Apartment, suite, building, etc."
                component={ValidateField}
              />
              <Field
                label="City"
                name="city"
                type="text"
                component={ValidateField}
              />
              <Field
                label="State"
                name="state"
                type="text"
                component={ValidateField}
              />
              <Field
                label="Zip"
                name="zip"
                type="text"
                component={ValidateField}
              />

              <hr />

              <h2 className="title is-4">
                Payment Information
              </h2>

              <hr />

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
                  <button type="button" className="button is-light">
                    Cancel
                  </button>
                </div>
              </div>
            </form>

            <hr />

            <CompletePurchase
              cart={cart}
              sendOrder={sendOrder}
              formInfo={this.state}
              history={this.props.history}
            />
          </div>
        )}
      </div>
    )
  }
}

BillingShipping = reduxForm({
  form: 'billingShipping',
  // validate: validateCheckout
})(BillingShipping)

export default connect(null, null)(BillingShipping)
