import axios from 'axios'

//Action Types
const EDIT_PRODUCT = 'EDIT_PRODUCT'
const FETCH_PRODUCT = 'FETCH_PRODUCT'

//Action Creators
export function editProduct(values) {
  const action = { type: EDIT_PRODUCT, values }
  return action
}

const fetchProduct = product => ({ type: FETCH_PRODUCT, product })

//Thunks
export const editExistingProduct = product => {
  return async dispatch => {
    const res = await axios.put(
      `/api/products/${product.id}/editProduct`,
      product
    )
    const editedProduct = res.data
    dispatch(editProduct(editedProduct))
  }
}

export const getProduct = productId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/products/${productId}`)
    dispatch(fetchProduct(data || {}))
  } catch (err) {
    console.error(err)
  }
}

//Reducer
export default function reducer(state, action) {
  switch (action.type) {
    case EDIT_PRODUCT:
      return action.values
    case FETCH_PRODUCT:
      return action.product
    default:
      return state
  }
}
