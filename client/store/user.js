import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const FETCH_USER = 'FETCH_USER'
const UPDATE_USER = 'UPDATE_USER'
const REMOVE_USER = 'REMOVE_USER'

const FETCH_USERS = 'FETCH_USERS'

/**
 * INITIAL STATES
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const fetchUser = user => ({ type: FETCH_USER, user })
const updateUser = user => ({ type: UPDATE_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
const fetchUsers = users => ({ type: FETCH_USERS, users })

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const { data } = await axios.get('/auth/me')
    dispatch(fetchUser(data || {}))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (formData, method) => async dispatch => {
  let res
  try {
    const { firstName, lastName, email, password } = formData
    res = await axios.post(`/auth/${method}`, {
      firstName,
      lastName,
      email,
      password
    })
  } catch (authError) {
    return dispatch(fetchUser({ error: authError }))
  }

  try {
    dispatch(fetchUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const getUsers = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/users')
    console.log()
    dispatch(fetchUsers(data || []))
  } catch (error) {
    return dispatch(fetchUsers({ error }))
  }
}

/**
 * REDUCERS
 */
export const userReducer = (state = defaultUser, action) => {
  // export default function(state = defaultUser, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.user
    case UPDATE_USER:
      console.log('hello from the `userReducer` func')
      return state
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}

export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.users
    default:
      return state
  }
}
