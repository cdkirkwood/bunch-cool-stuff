import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { editCart } from '../store'

class Cart extends Component {

  removeItem(orderId, productId) {
    const quantity = 0
    this.props.editCart(orderId, productId, quantity)
  }

  render() {
    const products = this.props.cart.products
    return products ?
      <div className="cart-container">
        {products.map(product => {
          return (
            <div className="cart-card" key={product.id}>
              <div className="cart-image">
                <NavLink to={`/product/${product.id}`}>
                  <img id="cart-image" src={product.imageUrl} />
                </NavLink>
                <NavLink className="NavLink" to={`/product/${product.id}`}>
                  <h4>{product.name}</h4>
                </NavLink>
              </div>
              <div className="cart-description">
                <h4 className="cart-quantity">{product.orderQuantity.quantity}</h4>
                <h4 className="cart-price">${+product.price * product.orderQuantity.quantity}</h4>
                <button className="remove-button" onClick={() => this.removeItem(this.props.cart.id, product.id)}>X</button>
              </div>
            </div>
          )
        }
        )}
        <div className="cart-buttons">
          <NavLink className="NavLink" to="/checkout">Checkout </NavLink>
        </div>
      </div>
      : <h3>You Cart is Empty</h3>
  }
}

const mapStateToProps = (state) => ({ cart: state.cart, products: state.products })

const mapDispatch = (dispatch) => ({
  editCart: (orderId, productId, quantity) =>
    dispatch(editCart(orderId, productId, quantity))
})

const CartContainer = connect(mapStateToProps, mapDispatch)(Cart)

export default CartContainer
