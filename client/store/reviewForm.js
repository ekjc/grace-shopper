import axios from 'axios'

const CREATE_REVIEW = 'CREATE_REVIEW'

export function createReview(review) {
//   const action = { type: CREATE_REVIEW, values }
//   return action
    return {
        type: CREATE_REVIEW,
        review
    }
}

export const createNewReview = product => {
console.log('product.id', product.id)
  return async dispatch => {
    const res = await axios.post(`/api/products/${product.id}/reviewForm`, product)
    const newReview = res.data
    dispatch(createReview(newReview))
  }
}

const initialState = {}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_REVIEW:
      return action.review
    default:
      return state
  }
}