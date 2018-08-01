import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'
import { logout } from '../store'

const toggleNavbarMenu = event => {
  const navbarBurger = event.target;
  const navbarMenu = document.getElementById('navPrimary')

  navbarBurger.classList.toggle('is-active')
  navbarMenu.classList.toggle('is-active')
}

const Navbar = ({ myId, handleLogout, isLoggedIn, isAdmin }) => (
  <nav className="navbar is-primary">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item has-background-primary">
          <Logo />
        </Link>
        <div
          className="navbar-burger burger"
          onClick={event => toggleNavbarMenu(event)}
          data-target="navPrimary"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="navPrimary" className="navbar-menu">
        <div className="navbar-start">
          <NavLink to="/products/beer" className="navbar-item" activeClassName="is-active">
            Beer
          </NavLink>
          <NavLink to="/products/wine" className="navbar-item" activeClassName="is-active">
            Wine
          </NavLink>
          <NavLink to="/products/liquor" className="navbar-item" activeClassName="is-active">
            Liquor
          </NavLink>
        </div>

        <div className="navbar-end">
          {isLoggedIn && (

            <div className="navbar-item has-dropdown is-hoverable">

                <NavLink className="navbar-link" to="/user-dashboard">My Account</NavLink>
                <div className="navbar-dropdown">
                  <NavLink
                    to={`/user/${myId}/profile`}
                    className="navbar-item"
                    activeClassName="is-active"
                  >
                    My Profile
                  </NavLink>

                  <Link to={`/user/${myId}/orders`} className="navbar-item">My Orders</Link>
                  <Link
                    to={`/user/${myId}/reviews`}
                    className="navbar-item"
                  >My Reviews</Link>

                  {isAdmin && (
                    <div>
                      <hr className="navbar-divider" />
                      <NavLink
                        to="/manage"
                        className="navbar-item"
                        activeClassName="is-active"
                      >
                        Manage
                      </NavLink>
                    </div>
                  )}
                  <hr className="navbar-divider" />
                  <a href="#" onClick={handleLogout} className="navbar-item">
                    Logout
                  </a>
                </div>

            </div>
          )}

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

const mapState = state => {

  // const cartId = state.cart.info.id || null

  return {
    isLoggedIn: !!state.me.id,
    isAdmin: !!state.me.isAdmin,
    myId: state.me.id
  }
}

const mapDispatch = dispatch => ({
  handleLogout: () => dispatch(logout())
})

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
