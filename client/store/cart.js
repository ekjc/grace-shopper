import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const REQUEST_CART = 'REQUEST_CART'
const RECEIVE_CART = 'RECEIVE_CART'

const REQUEST_CART_ITEMS = 'REQUEST_CART_ITEMS'
const RECEIVE_CART_ITEMS = 'RECEIVE_CART_ITEMS'

const CREATE_CART_SUCCESS = 'CREATE_CART_SUCCESS'
const CREATE_CART_ITEM_SUCCESS = 'CREATE_CART_ITEM_SUCCESS'
const UPDATE_CART_ITEM_SUCCESS = 'UPDATE_CART_ITEM_SUCCESS'
const DELETE_CART_SUCCESS = 'DELETE_CART_SUCCESS'
const DELETE_CART_ITEM_SUCCESS = 'DELETE_CART_ITEM_SUCCESS'

/**
 * ACTION CREATORS
 */
const requestCart = () => ({ type: REQUEST_CART })
const receiveCart = cart => ({ type: RECEIVE_CART, cart })

const requestCartItems = () => ({ type: REQUEST_CART_ITEMS })
const receiveCartItems = items => ({ type: RECEIVE_CART_ITEMS, items })

const createCartSuccess = cart => ({ type: CREATE_CART_SUCCESS, cart })
const createCartItemSuccess = item => ({ type: CREATE_CART_SUCCESS, item })
const updateCartItemSuccess = item => ({
  type: UPDATE_CART_ITEM_SUCCESS,
  item
})
const deleteCartSuccess = cartId => ({ type: DELETE_CART_SUCCESS, cartId })
const deleteCartItemSuccess = item => ({
  type: DELETE_CART_ITEM_SUCCESS,
  item
})

/**
 * THUNK CREATORS
 */
export const fetchCart = cartId => async dispatch => {
  dispatch(requestCart())
  try {
    // Yes, we're in the cart store, but the cart info is
    // applicable to cart and order, so all general cart/order
    // info is accessible via the Orders API
    const { data } = await axios.get(`/api/orders/${cartId}`)
    dispatch(receiveCart(data || {}))
  } catch (err) {
    console.error(err)
  }
}

export const fetchCartItems = cartId => async dispatch => {
  dispatch(requestCartItems())
  try {
    // Yes, we're in the cart store, but the cart info is
    // applicable to cart and order, so all general cart/order
    // info is accessible via the Orders API
    const { data } = await axios.get(`/api/orders/${cartId}/items`)
    dispatch(receiveCartItems(data || []))
  } catch (err) {
    console.error(err)
  }
}

export const createCart = cart => async dispatch => {
  try {
    const { data } = await axios.post(`/api/cart`, cart)
    dispatch(createCartSuccess(data || {}))
  } catch (err) {
    console.error(err)
  }
}

export const createCartItem = (userId, productId, qty) => async dispatch => {
  try {
    const { data } = await axios.post(`/api/cart/${userId}/${productId}`, {
      qty
    })
    dispatch(createCartItemSuccess(data || {}))
  } catch (err) {
    console.error(err)
  }
}

export const updateCartItem = (orderId, productId, qty) => async dispatch => {
  try {
    const { data } = await axios.put( `/api/cart/${orderId}/${productId}`, {qty})
    dispatch(updateCartItemSuccess(data || {}))
  } catch (err) {
    console.error(err)
  }
}

export const deleteCart = orderId => async dispatch => {
  try {
    const { data } = await axios.delete(`/api/cart/${orderId}`)
    dispatch(deleteCartSuccess(data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteCartItem = (orderId, productId) => async dispatch => {
  try {
    const { data } = await axios.delete(`/api/cart/${orderId}/${productId}`)
    dispatch(deleteCartItemSuccess(data))
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
    case REQUEST_CART:
    case  REQUEST_CART_ITEMS:
      return {
        ...state,
        isLoading: true
      }

    case RECEIVE_CART:
      return {
        ...state,
        info: action.cart,
        isLoading: false
      }

    case RECEIVE_CART_ITEMS:
      return {
        ...state,
        items: action.items,
        isLoading: false
      }

    case CREATE_CART_SUCCESS:
      return {
        ...state,
        info: action.cart
      }

    case CREATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.item]
      }

    case UPDATE_CART_ITEM_SUCCESS:
      return {
        ...state,
        items: [...state.items.filter(item => item.product.id !== action.item.product.id), action.item]
      }

    case DELETE_CART_SUCCESS:
      return initialCart

    case DELETE_CART_ITEM_SUCCESS:
      return {
        ...state,
        items: [...state.items.filter(item => Number(item.productId) !== Number(action.item))]
      }

    default:
      return state
  }
}
