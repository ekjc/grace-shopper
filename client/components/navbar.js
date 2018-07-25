import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

// const Navbar = (props) => {
//   console.log('Navbar props', props);

//   const { handleClick, isLoggedIn, isAdmin } = props;

//   return (
//     <div>
//       <h1>Dichotomy Engine</h1>
//       <nav>
//         <Link to="/">Home</Link>
//         <Link to="/products">Products</Link>
//         <Link to="/">TESSSSSSST ME</Link>
//         {isLoggedIn && <Link to="/user-dashboard">My Account</Link>}
//         {isLoggedIn && <a href="#" onClick={handleClick}>Logout</a>}
//         {!isLoggedIn && <Link to="/login">Login</Link>}
//         {!isLoggedIn && <Link to="/signup">Signup</Link>}
//       </nav>
//       <hr />
//     </div>
//   )
// }

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div>
    <h1>Dichotomy Engine</h1>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      {isLoggedIn && <Link to="/user-dashboard">My Account</Link>}
      {isLoggedIn && <a href="#" onClick={handleClick}>Logout</a>}
      {!isLoggedIn && <Link to="/login">Login</Link>}
      {!isLoggedIn && <Link to="/signup">Signup</Link>}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => ({
  isLoggedIn: !!state.me.id,
  isAdmin: !!state.me.isAdmin
})

const mapDispatch = dispatch => ({
  handleClick: () => dispatch(logout())
})

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
