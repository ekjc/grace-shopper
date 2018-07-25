import React from 'react'
import { Route, Switch, Link } from 'react-router-dom';
import { Navbar } from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
