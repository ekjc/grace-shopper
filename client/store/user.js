import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const FETCH_ME = 'FETCH_ME'
const REMOVE_ME = 'REMOVE_ME'

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
const fetchMe = me => ({ type: FETCH_ME, me })
const removeMe = () => ({ type: REMOVE_ME })

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
    dispatch(fetchMe(data || {}))
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
    return dispatch(fetchMe({ error: authError }))
  }

  try {
    dispatch(fetchMe(res.data))
    history.push('/user-dashboard')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeMe())
    history.push('/')
  } catch (err) {
    console.error(err)
  }
}

export const getUsers = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/users')
    dispatch(fetchUsers(data || []))
  } catch (error) {
    return dispatch(fetchUsers({ error }))
  }
}

export const getUser = userId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/users/${userId}`)
    dispatch(fetchUser(data || {}))
  } catch (err) {
    console.error(err)
  }
}

export const editUser = user => async dispatch => {
  try {
    const { data } = await axios.put(`/api/users/${user.id}`, user)
    dispatch(updateUser(data || {}))
    history.push('/manage/users');
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCERS
 */
export const meReducer = (state = defaultUser, action) => {
  switch (action.type) {
    case FETCH_ME:
      return action.me
    case REMOVE_ME:
      return defaultUser
    default:
      return state
  }
}

export const userReducer = (state = defaultUser, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.user
    case UPDATE_USER:
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
