import React from 'react'
import { Route, Switch, Link } from 'react-router-dom';
import {Navbar} from './components'
import Routes from './routes'
import ProductsList from './components/ProductsList'

const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/products" component={ProductsList} />
      </Switch>
    </div>
  )
}

export default App
