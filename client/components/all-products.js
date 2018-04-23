import React from 'react'
import { connect } from 'react-redux'

const AllProducts = (props) => {
  {
    return props.products ?
      <div className="all-products-container">
        <h1>Products</h1>
        <div className="products-grid">
          {props.products.length && props.products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.imageUrl} />
              <h3>{product.name}</h3>
              <h3>{product.price}</h3>
            </div>
          )
          )}
        </div>
      </div>
      : <h3>...Loading</h3>
  }
}

const mapStateToProps = state => ({ products: state.products })

const AllProductsContainer = connect(mapStateToProps)(AllProducts)

export default AllProductsContainer
