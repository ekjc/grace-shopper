import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { meReducer as me, usersReducer as users } from './user'
import { reducer as form } from 'redux-form'
import categories from './categories'
import products from './products'
import reviews from './reviews'
import cart from './cart'
// Same reducer func for order we need to choose one
import order from './order'
import orders from './orders'

const reducer = combineReducers({
  me,
  users,
  form,
  categories,
  products,
  reviews,
  cart,
  // duplicate here with order
  order,
  orders
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './categories'
export * from './products'
export * from './reviews'
export * from './cart'
// same here
export * from './order'
export * from './orders'
