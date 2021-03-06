import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="navbar-container">
    <h1>A Bunch of Cool Stuff</h1>

    {isLoggedIn ? (
      <div className="nav-items">
        {/* The navbar will show these links after you log in */}
        <Link className="NavLink" to="/home">Home</Link>
        <a href="#" onClick={handleClick}>
          Logout
          </a>
        <Link className="NavLink" to="/cart">Cart</Link>
      </div>
    ) : (
        <div className="nav-items">
          {/* The navbar will show these links before you log in 
          */}
          <Link className="NavLink" to="/">Home</Link>
          <Link className="NavLink" to="/cart">Cart</Link>

        </div>
      )}

  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
