import axios from 'axios'
// import history from '../history'

// ACTION TYPES
const FETCH_PRODUCT_BY_ID = 'FETCH_SINGLE_PRODUCT_BY_ID'

// ACTION CREATORS
const fetchProductById = product => ({
  type: FETCH_PRODUCT_BY_ID,
  product
})

// THUNK CREATORS
export const getProductById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${id}`)
    dispatch(fetchProductById(res.data))
  } catch (err) {
    console.error('Your error was ', err)
  }
}

// INITIAL STATE
const initialState = {}

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCT_BY_ID:
      return action.product
    default:
      return state
  }
}
