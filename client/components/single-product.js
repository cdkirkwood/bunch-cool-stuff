import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { postCart, editCart } from '../store'

class SingleProduct extends React.Component {

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault()
    const userId = this.props.user.id
    const productId = this.props.match.params.id
    const quantity = 1
    const orderId = this.props.cart.id
    if (orderId) this.props.editCart(orderId, productId, quantity)
    else this.props.postCart(userId, productId, quantity)
  }

  render() {
    const product = this.props.products.find(elem => elem.id === +this.props.match.params.id)
    return product ? (
      <form className="single-product-container" onSubmit={this.handleSubmit}>
        <img src={product.imageUrl} className="image" />
        <div className="product-info">
          <h3>{product.name}</h3>
          <h3>{`$${product.price}`}</h3>
          <p>{product.description}</p>
          <button>Add To Cart</button>
        </div>
      </form>) : <h3>...Loading</h3>
  }
}

const mapStateToProps = state => ({ products: state.products, user: state.user, cart: state.cart })

const mapDispatch = (dispatch) => ({
  editCart: (orderId, productId, quantity) =>
    dispatch(editCart(orderId, productId, quantity)),
  postCart: (userId, productId, quantity) =>
    dispatch(postCart(userId, productId, quantity))
})

const SingleProductContainer = connect(mapStateToProps, mapDispatch)(SingleProduct)

export default SingleProductContainer
