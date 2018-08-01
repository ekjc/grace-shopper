import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { meReducer as me, usersReducer as users } from './users'
import { reducer as form } from 'redux-form'
import categories from './categories'
import products from './products'
import reviews from './reviews'
import cart from './cart'
import orders from './orders'

const reducer = combineReducers({
  me,
  users,
  form,
  categories,
  products,
  reviews,
  cart,
  orders
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './users'
export * from './categories'
export * from './products'
export * from './reviews'
export * from './cart'
export * from './orders'
