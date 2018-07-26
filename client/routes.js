import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Login, Signup, ProductsList } from './components'
import {
  Home,
  SingleProductView,
  newProduct,
  editProduct,
  UserDashboard,
  EditUser,
  ManageUsers,
  ReviewForm
} from './containers'
import { me } from './store'

const PrivateRoute = ({
  component: MyComponent,
  isLoading,
  isLoggedIn,
  ...rest
}) => {
  if (!isLoading) {
    return (
      <Route
        {...rest}
        render={props =>
          // isLoggedIn ? <MyComponent {...props} /> : <Redirect to="/" />
          <MyComponent {...props} />
        }
      />
    )
  }

  return null
}

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props

    return (
      <Switch>

        <Route
          path="/products/:productId/editProduct"
          component={editProduct}
        />
        <Route exact path="/products/:productId/reviewForm" component={ReviewForm}/>
        <Route path="/products/addProduct" component={newProduct} />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={ProductsList} />
        <Route path="/products/:productId" component={SingleProductView} />
        <PrivateRoute
          path="/user-dashboard"
          component={UserDashboard}
          {...this.props}
        />
        <PrivateRoute
          exact path="/manage/users"
          component={ManageUsers}
          {...this.props}
        />
        <PrivateRoute
          path="/manage/users/:userId"
          component={EditUser}
          {...this.props}
        />

        {/* isLoggedIn && (
          <Switch>
            <Route path="/home" component={UserDashboard} />
            {isAdmin && <Route path="/manage" component={Manage} />}
          </Switch>
        ) */}

        <Route component={Home} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
    isLoading: !!state.me.isLoading,
    isLoggedIn: !!state.me.id,
    isAdmin: !!state.me.isAdmin
})

const mapDispatch = dispatch => ({
  loadInitialData: () => dispatch(me())
})

// `withRouter` makes sure updates are not blocked when url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
