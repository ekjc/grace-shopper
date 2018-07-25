import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const VIEW_SINGLE_PRODUCT = 'VIEW_SINGLE_PRODUCT'

/**
 * INITIAL STATE
 */
const selectedProduct = {}

/**
 * ACTION CREATORS
 */
const gotProductWithIdFromServer = (singleProduct) => (
    {type: VIEW_SINGLE_PRODUCT, singleProduct}
  )

/**
 * THUNK CREATORS
 */
export const getProductById = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${id}`)
    dispatch(gotProductWithIdFromServer(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = selectedProduct, action) {
  switch (action.type) {
    case VIEW_SINGLE_PRODUCT:
      return action.selectedProduct
    default:
      return state
  }
}