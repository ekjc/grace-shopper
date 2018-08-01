import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router-dom'
import Routes from './routes'
import history from './history'
import store from './store'
import { Navbar } from './components'
import './sass/index.scss'

// Using `<Route />` to display Navbar here because of update blocking.
// See: https://reacttraining.com/react-router/core/guides/dealing-with-update-blocking
const App = () => (
  <div>
    <Route component={Navbar} />
    <div className="section">
      <div className="container">
        <Routes />
      </div>
    </div>
  </div>
)

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)
