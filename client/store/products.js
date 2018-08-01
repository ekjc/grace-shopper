import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'
const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'

const REQUEST_PRODUCT = 'REQUEST_PRODUCT'
const RECEIVE_PRODUCT = 'RECEIVE_PRODUCT'

const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS'
const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS'
const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS'

const REMOVE_ACTIVE_PRODUCT = 'REMOVE_ACTIVE_PRODUCT'

/**
 * ACTION CREATORS
 */
const requestProducts = () => ({ type: REQUEST_PRODUCTS })
const receiveProducts = products => ({ type: RECEIVE_PRODUCTS, products })

const requestProduct = () => ({ type: REQUEST_PRODUCT })
const receiveProduct = product => ({ type: RECEIVE_PRODUCT, product })

const createProductSuccess = product => ({
  type: CREATE_PRODUCT_SUCCESS,
  product
})
const updateProductSuccess = product => ({
  type: UPDATE_PRODUCT_SUCCESS,
  product
})
const deleteProductSuccess = productId => ({
  type: DELETE_PRODUCT_SUCCESS,
  productId
})

export const removeActiveProduct = () => ({ type: REMOVE_ACTIVE_PRODUCT })

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => async dispatch => {
  dispatch(requestProducts())
  try {
    const { data } = await axios.get('/api/products')
    dispatch(receiveProducts(data || []))
  } catch (error) {
    console.error(error)
  }
}

export const fetchProductsByCategory = categoryId => async dispatch => {
  dispatch(requestProducts())
  try {
    const { data } = await axios.get(
      `/api/products/${categoryId ? `categories/${categoryId}` : ''}`
    )
    dispatch(receiveProducts(data || []))
  } catch (error) {
    console.error(error)
  }
}

export const fetchProduct = productId => async dispatch => {
  dispatch(requestProduct())
  try {
    const { data } = await axios.get(`/api/products/${productId}`)
    dispatch(receiveProduct(data || {}))
  } catch (error) {
    console.error(error)
  }
}

export const createProduct = product => async dispatch => {
  try {
    const { data } = await axios.post(`/api/products`, product)
    dispatch(createProductSuccess(data || {}))
    history.push(`/manage/product/${data.id}`)
  } catch (error) {
    console.error(error)
  }
}

export const updateProduct = product => async dispatch => {
  try {
    const { data } = await axios.put(`/api/products/${product.id}`, product)
    dispatch(updateProductSuccess(data || {}))
    history.goBack()
  } catch (error) {
    console.error(error)
  }
}

export const deleteProduct = product => async dispatch => {
  try {
    const { data } = await axios.delete(`/api/products/${product.id}`)
    dispatch(deleteProductSuccess(data))
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
    case REQUEST_PRODUCTS:
    case REQUEST_PRODUCT:
      return {
        ...state,
        isLoading: true
      }

    case RECEIVE_PRODUCTS:
      return {
        ...state,
        isLoading: false,
        all: action.products
      }

    case RECEIVE_PRODUCT:
      return {
        ...state,
        isLoading: false,
        active: action.product
      }

    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        all: [...state.all, action.product]
      }

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        all: [...state.all]
      }

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        all: [...state.all].filter(item => item.id !== action.productId)
      }

    case REMOVE_ACTIVE_PRODUCT:
      return {
        ...state,
        active: {}
      }

    default:
      return state;
  }
}
