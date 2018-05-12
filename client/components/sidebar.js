import React from 'react'
import {NavLink} from 'react-router-dom'

const Sidebar = () => (
  <div className="sidebar">
    <NavLink className="NavLink" to="/">All Products</NavLink>
    <NavLink className="NavLink" to="/accessories">Accessories</NavLink>
    <NavLink className="NavLink" to="/caps">Caps</NavLink>
    <NavLink className="NavLink" to="/tees">Tees</NavLink>
  </div>
)

export default Sidebar
