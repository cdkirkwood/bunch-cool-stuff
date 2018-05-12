import React from 'react'
import { NavLink } from 'react-router-dom'

const AllProducts = (props) => {
  const products = props.type ?
    props.products.filter(product => product.variety === props.type)
    : props.products
  return (
    <div className="all-products-container">
      <h1>Products</h1>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
          <NavLink className="NavLink" to={`/product/${product.id}`}>
            <img className="image" src={product.imageUrl} />
          </NavLink>
            <br />
            <NavLink className="NavLink" to={`/product/${product.id}`}>{product.name}</NavLink>
            <h3>{`$${product.price}`}</h3>
          </div>
        )
        )}
      </div>
    </div>
  )
}

export default AllProducts
