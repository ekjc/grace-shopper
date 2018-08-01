import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const REQUEST_REVIEWS = 'REQUEST_REVIEWS'
const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS'

// TODO -- delete these??
const RECEIVE_REVIEWS_BY_PRODUCT = 'RECEIVE_REVIEWS_BY_PRODUCT'
const RECEIVE_REVIEWS_BY_USER = 'RECEIVE_REVIEWS_BY_USER'

const REQUEST_REVIEW = 'REQUEST_REVIEW'
const RECEIVE_REVIEW = 'RECEIVE_REVIEW'

const CREATE_REVIEW_SUCCESS = 'CREATE_REVIEW_SUCCESS'
const UPDATE_REVIEW_SUCCESS = 'UPDATE_REVIEW_SUCCESS'
const DELETE_REVIEW_SUCCESS = 'DELETE_REVIEW_SUCCESS'

/**
 * ACTION CREATORS
 */
const requestReviews = () => ({ type: REQUEST_REVIEWS })
const receiveReviews = reviews => ({ type: RECEIVE_REVIEWS, reviews })

// TODO -- delete these?
const receiveReviewsForProduct = reviews => ({
  type: RECEIVE_REVIEWS_BY_PRODUCT, reviews
})
const receiveReviewsByUser = reviews => ({
  type: RECEIVE_REVIEWS_BY_USER, reviews
})

const requestReview = () => ({ type: REQUEST_REVIEW })
const receiveReview = review => ({ type: RECEIVE_REVIEW, review })

const createReviewSuccess = review => ({
  type: CREATE_REVIEW_SUCCESS,
  review
})
const updateReviewSuccess = review => ({
  type: UPDATE_REVIEW_SUCCESS,
  review
})
const deleteReviewSuccess = reviewId => ({
  type: DELETE_REVIEW_SUCCESS,
  reviewId
})

/**
 * THUNK CREATORS
 */
export const fetchReviews = () => async dispatch => {
  dispatch(requestReviews())
  try {
    const { data } = await axios.get('/api/reviews')
    dispatch(receiveReviews(data || []))
  } catch (error) {
    console.error(error)
  }
}

export const fetchReviewsForProduct = productId => async dispatch => {
  dispatch(requestReviews())
  try {
    const { data } = await axios.get(`/api/reviews/product/${productId}`)
    dispatch(receiveReviews(data || []))
  } catch (error) {
    console.error(error)
  }
}

export const fetchReviewsByUser = userId => async dispatch => {
  dispatch(requestReviews())
  try {
    const { data } = await axios.get(`/api/reviews/user/${userId}`)
    dispatch(receiveReviews(data || []))
  } catch (error) {
    console.error(error)
  }
}

export const createReview = (review, userId, productId) => async dispatch => {
  try {
    const { data } = await axios.post(`/api/reviews`, {review, productId})
    dispatch(createReviewSuccess(data || {}))
    history.push(`/product/${productId}`)
  } catch (error) {
    console.error(error)
  }
}

export const updateReview = review => async dispatch => {
  try {
    const { data } = await axios.put(`/api/reviews/${review.id}/`, review)
    dispatch(updateReviewSuccess(data || {}))
    history.goBack()
  } catch (error) {
    console.error(error)
  }
}

export const deleteReview = review => async dispatch => {
  try {
    const { data } = await axios.delete(`/api/reviews/${review.id}`)
    dispatch(deleteReviewSuccess(data || {}))
  } catch (error) {
    console.error(error)
  }
}

/**
 * INITIAL STATE
 */
const initialState = {
  isLoading: false,
  active: {},
  all: []
}

/**
 * REDUCERS
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_REVIEWS:
    case REQUEST_REVIEW:
      return {
        ...state,
        isLoading: true
      }

    case RECEIVE_REVIEWS:
    case RECEIVE_REVIEWS_BY_PRODUCT:
      return {
        ...state,
        isLoading: false,
        all: action.reviews
      }

    case RECEIVE_REVIEWS_BY_USER:
      return {
        ...state,
        isLoading: false,
        all: action.reviews
      }

    case RECEIVE_REVIEW:
      return {
        ...state,
        isLoading: false,
        active: action.review
      }

    case CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        all: [...state.all, action.review]
      }

    case UPDATE_REVIEW_SUCCESS:
      return {
        ...state,
        all: [...state.all]
      }

    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        all: [...state.all].filter(item => item.id !== action.reviewId)
      }

    default:
      return state;
  }
}
