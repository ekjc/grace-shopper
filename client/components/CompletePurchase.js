/*eslint complexity: ["error", 20]*/
import React, { Component } from 'react';

class CompletePurchase extends Component {
  constructor(props) {
    super(props)
    this.state = {} //in case we add in some kind of error handling...
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { cart, sendOrder, formInfo, history } = this.props
    await sendOrder({orderId: cart.id, formInfo, statusCode: 3}) // 3 = processing
    history.push('/orderConfirmation')
  }

  render() {
    // const { cart, sendOrder, formInfo } = this.props
    return (
      <div style={{ marginTop: '2rem' }}>
        <p>
          <span>
            <button
              type="button"
              className="button is-link"
              onClick={(event) => this.handleSubmit(event)}>
              Complete Purchase
            </button>
          </span>
        </p>
      </div>
    )
  }
}

export default CompletePurchase
