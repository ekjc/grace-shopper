import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchOrderHistory}  from '../store'

class OrderHistory extends Component {

  componentDidMount() {
    this.props.fetchOrderHistory(this.props.match.params.userId)
  }

  render() {
    console.log('this.props.items from order history container', this.props.items)
    const orderHistory = this.props.items
    return (
      <div>
          {orderHistory.length && orderHistory.map(order => (
                    <div key={order[0].id}>
                    {console.log('order', order)} 
                        <h1>Created at: {order[0].createdAt}</h1>
                         <h1>Order status: {order[0].orderStatusCode.description}</h1>
                        <br/>
                    </div>
          ))}
          {!orderHistory.length && <h1>You have no order history! How do you expect to get drunk?</h1>}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log('state from OrderHistory', state)
  return {
    items: state.orders.items,
    userId: state.me.id
  }
}

const mapDispatch = dispatch => ({
    fetchOrderHistory: userId => dispatch(fetchOrderHistory(userId))
})

export default connect(mapState, mapDispatch)(OrderHistory)