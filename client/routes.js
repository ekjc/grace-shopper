import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import {
  CartView,
  PageNotFound,
  Confirmation,
} from './components'
import {
  Auth,
  Product,
  ProductListView,
  UserDashboard,
  Manage,
  AddProduct,
  UserProfile,
  UserOrders,
  UserReviews,
  AddReview
} from './containers'
import { me } from './store'

const PrivateRoute = ({
  component: MyComponent,
  isLoading,
  isLoggedIn,
  ...rest
}) => {
  if (isLoading || !isLoggedIn) return null

  return (
    <Route
      {...rest}
      render={
        props =>
          isLoggedIn ? <MyComponent {...props} /> : <Redirect to="/login" />
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
    const { isLoggedIn } = this.props
    return (
      <Switch>
        <Route exact path="/" component={ProductListView} />
        <Route path="/products" component={ProductListView} />
        <Route exact path="/product/:productId" component={Product} />
        <Route exact path="/review/add" component={AddReview} />
        <Route path="/cart/:orderId" component={CartView} />
        <Route path='/orderConfirmation/:orderNumber' component={Confirmation} />

        {/* isLoggedIn-only routes */}
        <PrivateRoute
          path="/user-dashboard"
          component={UserDashboard}
          {...this.props}
        />
        <PrivateRoute
          path="/user/:userId/profile"
          component={UserProfile}
          {...this.props}
        />
        <PrivateRoute
          path="/user/:userId/reviews"
          component={UserReviews}
          {...this.props}
        />
        <PrivateRoute
          path="/user/:userId/orders"
          component={UserOrders}
          {...this.props}
        />

        {/* isAdmin-only routes */}
        <PrivateRoute path="/manage" component={Manage} {...this.props} />
        <PrivateRoute
          path="/products/add"
          component={AddProduct}
          {...this.props}
        />
        <Route path="/(login|signup)" component={Auth} />
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
