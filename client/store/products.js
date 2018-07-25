import axios from 'axios'

// ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS'

// ACTION CREATORS
const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

// THUNK CREATORS
export const fetchProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/products')
    dispatch(getProducts(data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchProductsByCategory = (categoryId) => async (dispatch) => {
    const { data } = await axios.get(`/api/products/categories/${categoryId}`)
    console.log(data);
    console.log(dispatch);
    dispatch(getProducts(data))
}

// INITIAL STATE
const initialState = {
  products: []
}

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.products }
    default:
      return state
  }
}
