import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Login, Signup, CartView, PageNotFound } from './components'
import {
  Home,
  Auth,
  Product,
  ProductList,
  AddProduct,
  EditProduct,
  UserDashboard,
  ManageUsers,
  EditUser,
  ReviewForm
} from './containers'
import { me } from './store'

const PrivateRoute = ({
  component: MyComponent,
  isAdmin,
  isLoading,
  isLoggedIn,
  ...rest
}) => {
  if (isLoading || !isLoggedIn) return null;

  return (
    <Route
      {...rest}
      render={
        props =>
          isAdmin ? <MyComponent {...props} /> : <Redirect to="/login" />
          // <MyComponent {...props} />
      }
    />
  )
}

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props

    return (
      <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path="/products" component={ProductList} />
        <Route exact path="/products/:productId" component={Product} />
        <Route exact path="/products/:productId/reviewForm" component={ReviewForm}/>
      
        {/* temporarily putting cart here for dev work */}
        <Route path="/cart/:orderId" component={CartView} />

        {/* isLoggedIn-only routes */}
        <PrivateRoute
          path="/user-dashboard"
          component={UserDashboard}
          {...this.props}
        />

        {/* isAdmin-only routes */}
        <PrivateRoute
          path="/products/add"
          component={AddProduct}
          {...this.props}
        />
        <PrivateRoute
          path="/products/:productId/edit"
          component={EditProduct}
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

        <Route path='/(login|signup)' component={Auth} />
        <Route component={PageNotFound} />
      </Switch>
    )
  }
}

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

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
