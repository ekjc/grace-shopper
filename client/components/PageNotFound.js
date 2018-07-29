import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default () => (
  <div>
    <h1 className="title is-2">Sorry, we couldn't find that page.</h1>
    <p className="is-size-5">Try returning to the <Link to="/">homepage</Link> or browsing our <Link to="/products">product catalog</Link>. If the problem persists or your still can't find what you need, please contact us. Our customer service reps are ready to help you get drunk.</p>
  </div>
)
