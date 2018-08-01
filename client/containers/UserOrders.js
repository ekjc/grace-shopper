import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchOrdersByUser } from '../store'

class UserOrders extends Component {
  componentDidMount() {
    this.props.getOrders(this.props.match.params.userId)
  }

  render() {
    const { items } = this.props
    return (
      <div>
        <h1 className="title is-1">My Orders</h1>
        <p className="subtitle is-5">
          You have no order history! How do you expect to get drunk?
        </p>
        {/*items.map(order => (
          <div key={order.id}>
            <p>Created at: {order.createdAt}</p>
            <p>Order status: {order.orderStatusCode.description}</p>
            <br />
          </div>
        ))*/}
        {items.length === 0 && (
          <h1>You have no order history! How do you expect to get drunk?</h1>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  items: state.orders.items,
  userId: state.me.id
})

const mapDispatch = dispatch => ({
  getOrders: userId => dispatch(fetchOrdersByUser(userId))
})

export default connect(mapState, mapDispatch)(UserOrders)
