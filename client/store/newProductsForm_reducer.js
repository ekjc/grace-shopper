import axios from 'axios'

const CREATE_PRODUCT = 'CREATE_PRODUCT'

export function createProduct(values) {
  const action = {type: CREATE_PRODUCT, values}
  return action
}

export const createNewProduct = () => {
  return async dispatch => {
    const res = await axios.post('/api/products/addProduct')
    const newProduct = res.data
    dispatch(createProduct(newProduct))
  }
}

export default function reducer(state, action) {
  switch (action.type) {
    case CREATE_PRODUCT:
      return action.values
    default:
      return state
  }
}
