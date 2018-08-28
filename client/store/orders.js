import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const REQUEST_ORDER = 'REQUEST_ORDER'
const RECEIVE_ORDER = 'RECEIVE_ORDER'

const REQUEST_ORDERS = 'REQUEST_ORDERS'
const RECEIVE_ORDERS = 'RECEIVE_ORDERS'

const REQUEST_ORDER_ITEMS = 'REQUEST_ORDER_ITEMS'
const RECEIVE_ORDER_ITEMS = 'RECEIVE_ORDER_ITEMS'

const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS'
const UPDATE_ORDER_SUCCESS = 'UPDATE_ORDER_SUCCESS' // ????????????
const DELETE_ORDER_SUCCESS = 'DELETE_ORDER_SUCCESS'

const PROCESS_ORDER_SUCCESS = 'PROCESS_ORDER_SUCCESS'

/**
 * ACTION CREATORS
 */
const requestOrder = () => ({ type: REQUEST_ORDER })
const receiveOrder = order => ({ type: RECEIVE_ORDER, order })

const requestOrders = () => ({ type: REQUEST_ORDER })
const receiveOrders = orders => ({ type: RECEIVE_ORDER, orders })

const requestOrderItems = () => ({ type: REQUEST_ORDER_ITEMS })
const receiveOrderItems = items => ({
  type: RECEIVE_ORDER_ITEMS,
  items
})

const createOrderSuccess = order => ({
  type: CREATE_ORDER_SUCCESS,
  order
})
const updateOrderSuccess = orderItem => ({
  type: UPDATE_ORDER_SUCCESS,
  orderItem
})
const deleteOrderSuccess = orderId => ({
  type: DELETE_ORDER_SUCCESS,
  orderId
})

const processOrderSuccess = order => ({ type: PROCESS_ORDER_SUCCESS, order })

/**
 * THUNK CREATORS
 */
export const fetchOrders = () => async dispatch => {
  dispatch(requestOrders())
  try {
    const { data } = await axios.get(`/api/orders`)
    dispatch(receiveOrders(data || {}))
  } catch (error) {
    console.error(error)
  }
}

export const fetchOrder = orderId => async dispatch => {
  dispatch(requestOrder())
  try {
    const { data } = await axios.get(`/api/orders/${orderId}`)
    dispatch(receiveOrder(data || {}))
  } catch (error) {
    console.error(error)
  }
}

export const fetchOrderHistory = userId => async dispatch => {
  dispatch(requestOrderItems())
  try {
    const { data } = await axios.get(`/api/orders/orderhistory/${userId}`)
    dispatch(receiveOrderItems(data || []))
  } catch (error) {
    console.error(error)
  }
}

export const fetchOrderItems = orderId => async dispatch => {
  dispatch(requestOrderItems())
  try {
    const { data } = await axios.get(`/api/orders/${orderId}/items`)
    dispatch(receiveOrderItems(data || []))
  } catch (error) {
    console.error(error)
  }
}

export const updateOrder = order => async dispatch => {
  try {
    const { data } = await axios.put(`/api/orders/${orderId}`, order)
    dispatch(updateOrderSuccess(data || {}))
    history.goBack();
  } catch (error) {
    console.error(error)
  }
}

export const deleteOrder = orderId => async dispatch => {
  try {
    const { data } = await axios.delete(`/api/orders/${orderId}`)
    dispatch(deleteOrderSuccess(data))
  } catch (error) {
    console.error(error)
  }
}

export const processOrder = ({ orderId, formInfo, statusCode }) => async dispatch => {
  try {
    const { data } = await axios.put(`/api/orders/${orderId}/processOrder`, formInfo, statusCode)
    dispatch(processOrderSuccess(data || {}))
  } catch (err) {
    console.error(err)
  }
}

/**
 * INITIAL STATE
 */
const initialOrder = {
  info: {},
  items: [],
  isLoading: false
}

/**
 * REDUCERS
 */
export default (state = initialOrder, action) => {
  switch (action.type) {
    case REQUEST_ORDER:
    case  REQUEST_ORDER_ITEMS:
      return {
        ...state,
        isLoading: true
      }

    case RECEIVE_ORDER:
      return {
        ...state,
        info: action.order,
        isLoading: false
      }

    case RECEIVE_ORDER_ITEMS:
      return {
        ...state,
        items: [...state.items, action.items],
        isLoading: false
      }

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        info: {
          ...state.info,
          ...action.order
        }
      }

    case DELETE_ORDER_SUCCESS:
      return initialOrder

    case PROCESS_ORDER_SUCCESS:
      return {
        ...state,
        info: action.order
      }

    default:
      return state
  }
}
