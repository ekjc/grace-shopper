import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { ManageMenu } from '../components'

import ManageUsers from './ManageUsers'
import ManageProducts from './ManageProducts'
import ManageCategories from './ManageCategories'
import ManageReviews from './ManageReviews'
import ManageOrders from './ManageOrders'

import EditUser from './EditUser'
import EditProduct from './EditProduct'
import EditCategory from './EditCategory'

class Manage extends Component {
  setActiveTab = event => {
    const tabs = [...document.querySelectorAll('[data-target-tab]')]
    tabs.forEach(t => t.classList.remove('is-active'))
    event.target.parentElement.classList.add('is-active')
  }

  render() {
    return (
      <div>
        <h1 className="title is-1">Manage</h1>
        <ManageMenu handleClick={this.setActiveTab} />
        <Switch>
          <Route exact path="/(manage|manage/users)" component={ManageUsers} />
          <Route path="/manage/user/:userId" component={EditUser} />
          <Route path="/manage/products" component={ManageProducts} />
          <Route path="/manage/product/:productId" component={EditProduct} />
          <Route path="/manage/categories" component={ManageCategories} />
          <Route path="/manage/category/:categoryId" component={EditCategory} />
          <Route path="/manage/reviews" component={ManageReviews} />
          <Route path="/manage/orders" component={ManageOrders} />
          {/*<Route path="/" component={EditOrder} />*/}
        </Switch>
      </div>
    )
  }
}

const mapState = state => ({
  // me: state.me
})

const mapDispatch = dispatch => ({})

export default connect(mapState)(Manage)
