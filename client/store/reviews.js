import axios from 'axios'
import history from '../history'

// ACTION TYPES
const FETCH_REVIEWS_BY_PRODUCT_ID = 'FETCH_REVIEWS_BY_PRODUCT_ID'

// ACTION CREATORS
const fetchReviewsByProductId = reviews => ({
  type: FETCH_REVIEWS_BY_PRODUCT_ID,
  reviews
})

// THUNK CREATORS
export const getReviewsByProductId = productId => async dispatch => {
  try {
    console.log('We made it to getReviewsByProductId')
    const res = await axios.get(`/api/products/${productId}/reviews`)
    console.log('res.data', res.data)
    dispatch(fetchReviewsByProductId(res.data))
  } catch (err) {
    console.error('Your error was ', err)
  }
}

// INITIAL STATE
const initialState = []

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_REVIEWS_BY_PRODUCT_ID:
      console.log('action.reviews', action.reviews)
      return action.reviews
    default:
      return state
  }
}
