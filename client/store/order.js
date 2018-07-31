import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const PROCESS_ORDER_SUCCESS = 'PROCESS_ORDER_SUCCESS'

/**
 * ACTION CREATORS
 */
const processOrderSuccess = (order) => ({ type: PROCESS_ORDER_SUCCESS, order })

/**
 * THUNK CREATORS
 */
export const processOrder = ({orderId, formInfo, statusCode}) => async dispatch => {
  try {
    const { data } = await axios.put(`/api/orders/${orderId}/processOrder`, formInfo, statusCode)
    dispatch(processOrderSuccess(data || {}))
    console.log('DATA RECEIVED FROM SERVER', data);
  } catch (err) {
    console.error(err)
  }
}

/**
 * INITIAL STATE
 */
const initialCart = {
  info: {},
  items: [],
  isLoading: false
}

/**
 * REDUCERS
 */

export default (state = initialCart, action) => {
  switch (action.type) {
    case PROCESS_ORDER_SUCCESS:
      return {
        ...state,
        info: action.cart
      }

    default:
      return state
  }
}
