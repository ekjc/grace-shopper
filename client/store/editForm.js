import axios from 'axios'

const EDIT_PRODUCT = 'EDIT_PRODUCT'

export function editProduct(values) {
  const action = { type: EDIT_PRODUCT, values }
  return action
}

export const editExistingProduct = product => {
  return async dispatch => {
    const res = await axios.put('/api/products/editProduct', product)
    const editedProduct = res.data
    dispatch(editProduct(editedProduct))
  }
}

export default function reducer(state, action) {
  switch (action.type) {
    case EDIT_PRODUCT:
      return action.values
    default:
      return state
  }
}
