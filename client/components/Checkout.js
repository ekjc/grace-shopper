import React, { Component } from 'react';

export const Checkout = ({sendOrder, cart}) => {
    return (
      <div style={{ marginTop: '2rem' }}>
        <p><span style={{ marginRight: '1rem', color: 'red' }}>TEST =></span>
          <span>
            <button
              type="button"
              className="button is-link"
              onClick={() => sendOrder(cart.id, 1)}> {/* 1 = 'processing'*/}
              Complete Purchase
            </button>
          </span>
        </p>
      </div>
    )
}
