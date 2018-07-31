import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchOrders } from '../store'
import { OrderRow } from '../components'

class ManageOrders extends Component {
  componentDidMount() {
    this.props.getOrders()
  }

  handleDelete = (event, order) => {
    event.preventDefault()
    // this.props.deleteOrder(category)
  }

  render() {
    const { orders, isLoading } = this.props

    if (isLoading) return null

    return (
      <div>
        <h2 className="title is-3">Orders</h2>
        <table className="table is-fullwidth is-striped">
          <colgroup>
            <col style={{ width: '8%' }} />
            <col style={{ width: '40%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '20%' }} />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Parent</th>
              <th scope="col"></th>
              <th />
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  isLoading: !!state.orders.isLoading,
  orders: state.orders.all
})

const mapDispatch = dispatch => ({
  getOrders: () => dispatch(fetchOrders()),
  // deleteOrder: category => dispatch(deleteOrder(category))
})

export default connect(mapState, mapDispatch)(ManageOrders)

/**
 * PROP TYPES
 */
ManageOrders.propTypes = {
  orders: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
}
