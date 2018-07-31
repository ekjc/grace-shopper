import React, { Component } from 'react';
import CompletePurchase from './CompletePurchase'
import Checkout from './Checkout'

class BillingShipping extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleForm: false,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: ''
    }
  }

  handleToggle = (event) => {
    let show;
    if (this.state.toggleForm === false) {
      show = true
    } else { show = false }
    this.setState({ [event.target.name]: show })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  scrollBottom = () => {
    window.scrollBy(0, window.innerHeight);
  }

  render() {
   const { cart, sendOrder } = this.props
    return (
    <div style={{ marginTop: '2rem' }}>
      <span>
        <button
          type="button"
          className={this.state.toggleForm ? "button is-light" : "button is-link"}
          name="toggleForm"
          onClick={(event) => {
            this.handleToggle(event)
            setTimeout(this.scrollBottom, 30)
          }}>
          Enter Shipping & Billing Info
        </button>
      </span>
    {this.state.toggleForm &&
    <div>
    <h2 style={{ marginTop: '2rem', fontWeight: 'bold'}}>Shipping Information</h2>
    <form style={{ marginTop: '.5rem'}}>
      <p>
      <label htmlFor="firstName">First Name: </label>
      <input
        name="firstName"
        type="text"
        onChange={this.handleChange}
        value={this.state.firstName}/>
      </p>
      <p>
      <label htmlFor="lastName">Last Name: </label>
      <input
        name="lastName"
        type="text"
        onChange={this.handleChange}
        value={this.state.lastName}/>
      </p>
      <p>
      <label htmlFor="email">Email Address: </label>
      <input
        name="email"
        type="email"
        onChange={this.handleChange}
        value={this.state.email} />
      </p>
      <p>
      <label htmlFor="phone">Phone: </label>
      <input
        name="phone"
        type="text"
        onChange={this.handleChange}
        value={this.state.phone} />
      </p>
      <p>
      <label htmlFor="street1">Address Line 1: </label>
      <input
        name="street1"
        type="text"
        onChange={this.handleChange}
        value={this.state.street1}/>
      </p>
      <p>
      <label htmlFor="street2">Address Line 2 (unit/apartment): </label>
      <input
        name="street2"
        type="text"
        onChange={this.handleChange}
        value={this.state.street2}/>
      </p>
      <p>
      <label htmlFor="city">City: </label>
      <input
        name="city"
        type="text"
        onChange={this.handleChange}
        value={this.state.city}/>
      </p>
      <p>
      <label htmlFor="state">State: </label>
      <input
        name="state"
        type="text"
        onChange={this.handleChange}
        value={this.state.state}/>
      </p>
      <p>
      <label htmlFor="zip">Zipcode: </label>
      <input
        name="zip"
        type="text"
        onChange={this.handleChange}
        value={this.state.zip}
        onBlur={this.handleComplete}/>
      </p>
    </form>
    <h2 style={{ marginTop: '2rem', fontWeight: 'bold'}}>Payment Information</h2>
    <p style={{ marginTop: '.8rem'}}>
      <Checkout />
      <img style={{ width: '15%', marginTop: '.8rem'}} src="https://waardex.com/wp-content/uploads/2018/04/logo-stripe-e1504674210431.png" />
    </p>
    <CompletePurchase
      cart={cart}
      sendOrder={sendOrder}
      formInfo={this.state}
      history={this.props.history}/>
  </div>}
  </div>
    )
  }
}

export default BillingShipping
