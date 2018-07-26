import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Login, Signup, UserDashboard, ProductsList } from './components'
import {
  Manage,
  SingleProductView,
  newProduct,
  editProduct,
  ReviewForm
} from './containers'
import { me } from './store'

const PrivateRoute = ({ component: MyComponent, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? <MyComponent {...props} /> : <Redirect to="/" />
    }
  />
)

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
        <Route exact path="/products/:productId/reviewForm" component={ReviewForm}/>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={ProductsList} />
        <Route exact path="/products/:productId" component={SingleProductView} />
        <PrivateRoute path="/home" component={UserDashboard} {...this.props} />
        <PrivateRoute path="/manage" component={Manage} {...this.props} />

        {/* isLoggedIn && (
          <Switch>
            <Route path="/home" component={UserDashboard} />
            {isAdmin && <Route path="/manage" component={Manage} />}
          </Switch>
        ) */}

        <Route path="/products/addProduct" component={newProduct} />
        <Route
          path="/products/:productId/editProduct"
          component={editProduct}
        />
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

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
