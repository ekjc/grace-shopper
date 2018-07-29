import React, { Component } from 'react';

export const Checkout = ({sendOrder, cart}) => {
    return (
      <div>
        <p style={{'margin':'15px', color: 'red'}}>TEST =>
          <span style={{'margin':'10px'}}>
            <button
              type="button"
              onClick={() => sendOrder(cart.id, 1)}> {/* 1 = 'processing'*/}
              Complete Purchase
            </button>
          </span>
        </p>
      </div>
    )
}
