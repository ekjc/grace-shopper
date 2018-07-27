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

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => async dispatch => {
  dispatch(requestProducts())
  try {
    const { data } = await axios.get('/api/products')
    dispatch(receiveProducts(data || []))
  } catch (err) {
    // return dispatch(receiveProducts({ error }))
    console.error(err)
  }
}

export const fetchProductsByCategory = categoryId => async dispatch => {
  dispatch(requestProducts())
  try {
    const { data } = await axios.get(`/api/products/categories/${categoryId}`)
    dispatch(receiveProducts(data || []))
  } catch (err) {
    // return dispatch(receiveProducts({ error }))
    console.error(err)
  }
}

export const fetchProduct = productId => async dispatch => {
  dispatch(requestProduct())
  try {
    const { data } = await axios.get(`/api/products/${productId}`)
    dispatch(receiveProduct(data || {}))
  } catch (err) {
    // return dispatch(receiveProduct({ error }))
    console.error(err)
  }
}

export const createProduct = product => async dispatch => {
  try {
    const { data } = await axios.post(`/api/products`, product)
    dispatch(createProductSuccess(data || {}))
    // history.push(`/manage/users/${data.id}`)
  } catch (err) {
    console.error(err)
  }
}

export const updateProduct = product => async dispatch => {
  try {
    const { data } = await axios.put(`/api/products/${product.id}`, product)
    dispatch(updateProductSuccess(data || {}))
    // history.push('/manage/users');
  } catch (err) {
    console.error(err)
  }
}

export const deleteProduct = product => async dispatch => {
  try {
    const { data } = await axios.delete(`/api/products/${product.id}`)
    dispatch(deleteProductSuccess(data || {}))
  } catch (err) {
    console.error(err)
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
export default function(state = initialState, action) {
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

    default:
      return state;
  }
}
