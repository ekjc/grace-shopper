/*eslint complexity: ["error", 20]*/
import React, { Component } from 'react';

class CompletePurchase extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { cart, sendOrder, formInfo } = this.props
    return (
      <div style={{ marginTop: '2rem' }}>
        <p>
          <span>
            <button
              type="button"
              className="button is-link"
              onClick={() => sendOrder({orderId: cart.id, formInfo, statusCode: 3})}> {/* 3 = 'processing'*/}
              Complete Purchase
            </button>
          </span>
        </p>
      </div>
    )
  }
}

export default CompletePurchase
