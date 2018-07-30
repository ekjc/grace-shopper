import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { logout } from '../store'

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <nav className="navbar is-primary">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          LOGO
        </Link>
        <div className="navbar-burger burger" data-target="navPrimary">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="navPrimary" className="navbar-menu">
        <div className="navbar-start">
        <NavLink to="/products" className="navbar-item" activeClassName="is-active">
            Products
          </NavLink>
          {/*
          <NavLink to="/products/beer" className="navbar-item" activeClassName="is-active">
            Beer
          </NavLink>
          <NavLink to="/products/wine" className="navbar-item" activeClassName="is-active">
            Wine
          </NavLink>
          <NavLink to="/products/liquor" className="navbar-item" activeClassName="is-active">
            Liquor
          </NavLink>
          */}
        </div>
        <div className='column is-3'>
          <input className="input" type="text" placeholder="Search"/>
        </div>
        <div className="navbar-end">
          {isLoggedIn && (
            <NavLink
              to="/user-dashboard"
              className="navbar-item"
              activeClassName="is-active"
            >
              My Account
            </NavLink>
          )}
          {isLoggedIn && (
            <a href="#" onClick={handleClick} className="navbar-item">
              Logout
            </a>
          )}
          {/*!isLoggedIn && (
            <div className="navbar-item">
              <span>
                <Link to="/login">
                  Sign in
                </Link>
                <span className="has-text-weight-normal" style={{ margin: '0 .25rem' }}>or</span>
                <Link to="/signup">
                  Sign up
                </Link>
              </span>
            </div>
          )*/}
          {!isLoggedIn && (
            <Link to="/login" className="navbar-item">
              Login
            </Link>
          )}
          {!isLoggedIn && (
            <Link to="/signup" className="navbar-item">
              Sign up
            </Link>
          )}
          <Link to="/cart" className="navbar-item">
            <span className="icon">
              <i className="fas fa-shopping-cart" />
            </span>
            <span className="is-hidden">Cart</span>
          </Link>
        </div>
      </div>
    </div>
  </nav>
)

const mapState = state => ({
  isLoggedIn: !!state.me.id,
  isAdmin: !!state.me.isAdmin
})

const mapDispatch = dispatch => ({
  handleClick: () => dispatch(logout())
})

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
