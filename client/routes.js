import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Login, Signup, CartView, PageNotFound, Confirmation } from './components'
import {
  Home,
  Auth,
  Product,
  ProductList,
  UserDashboard,
  Manage,
  ManageUsers,
  EditUser,
  ManageProducts,
  AddProduct,
  EditProduct,
  UserReviews,
  OrderHistory,
  ManageCategories,
  // AddCategory,
  EditCategory,
  ManageReviews,
  // AddReview,
  // EditReview,
  AddReview
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
          isLoggedIn ? <MyComponent {...props} /> : <Redirect to="/login" />
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
        {/*<Route exact path="/" component={Home} />*/}

        <Route exact path="/" component={ProductList} />
        <Route path="/products/:categoryName" component={ProductList} />
        <Route exact path="/product/:productId" component={Product} />

        <Route path='/reviews/user/:userId' component={UserReviews} />

        <Route path='/products' component={ProductList} />

        <Route exact path="/orders/orderhistory/:userId" component={OrderHistory}/>

        <Route exact path="/review/add" component={AddReview}/>

        <Route path="/cart" component={CartView} />

        <Route path='/orderConfirmation/:orderNumber' component={Confirmation} />

        {/* isLoggedIn-only routes */}
        <PrivateRoute
          path="/user-dashboard"
          component={UserDashboard}
          {...this.props}
        />

        {/* isAdmin-only routes */}
        <PrivateRoute
          path="/manage"
          component={Manage}
          {...this.props}
        />

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
