import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Summary from './checkout-summary'
import { appendCart } from '../store'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const { firstName, lastName, address1, address2, city, state, zip, email } = event.target
    const fullName = firstName.value + ' ' + lastName.value
    const shippingAddress = `${address1.value} ${address2.value} ${city.value} ${state.value} ${zip.value}`
    const emailAddress = email.value
    console.log(emailAddress)
    this.props.appendCart(this.props.cart.id, fullName, shippingAddress, emailAddress)
  }

  render() {
    return (
      <form className="checkout-form" onSubmit={this.handleSubmit}>
        <h3>Checkout</h3>
        <br />
        <h3>Contact Information</h3>
        <div className="checkout-input">
          <div className="checkout-small">
            <input name="firstName" type="text" placeholder="First Name" />
            <input name="lastName" type="text" placeholder="Last Name" />
          </div>
          <input className="checkout-large" name="email" type="text" placeholder="Email Address" />
          <input className="checkout-large" name="address1" type="text" placeholder="Address line 1" />
          <input className="checkout-large" name="address2" type="text" placeholder="Address line 2" />
          <div className="checkout-small">
            <input name="city" type="text" placeholder="City" />
            <input name="state" type="text" placeholder="State" />
          </div>
          <div className="checkout-small">
            <input name="zip" type="text" placeholder="Zip" />
            <input name="country" type="text" placeholder="Country" />
          </div>
        </div>
        <button>Proceed</button>
        <Summary />
      </form>
    )
  }
}

const mapState = state => ({ cart: state.cart })

const mapDispatch = (dispatch) => ({
  appendCart: (orderId, fullName, shippingAddress, emailAddress) =>
    dispatch(appendCart(orderId, fullName, shippingAddress, emailAddress))
})

const CheckoutContainer = connect(mapState, mapDispatch)(Checkout)

export default CheckoutContainer


