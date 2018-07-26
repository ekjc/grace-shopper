import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  meReducer as me,
  userReducer as user,
  usersReducer as users
} from './user'
import { reducer as form } from 'redux-form'
import products from './products'
import singleProduct from './singleProduct'
import reviews from './reviews'
import { addProduct } from './addForm'
import { editForm } from './editForm'
import { reviewForm } from './reviewForm'
import { cartReducer as cart } from './cart'

const reducer = combineReducers({
  me,
  user,
  users,
  form,
  products,
  singleProduct,
  addProduct,
  editForm,
  cart,
  reviews,
  reviewForm
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './products'
export * from './singleProduct'
export * from './editForm'
export * from './cart'
export * from './reviews'
export * from './reviewForm'

