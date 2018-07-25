import axios from 'axios'

// ACTION TYPES
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_PRODUCTS = 'GET_PRODUCTS'

// ACTION CREATORS
const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

// THUNK CREATORS
export const fetchProductsDB = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/products')
    dispatch(getAllProducts(data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/products')
    dispatch(getProducts(data))
  } catch (err) {
    console.error(err)
  }
}

// INITIAL STATE
const initialState = {
  // products: {}
  products: []
}

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { ...state, products: action.products }
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.products
      }
    default:
      return state
  }
}
