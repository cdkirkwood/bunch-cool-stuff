import React from 'react';
import {injectStripe} from 'react-stripe-elements'
import CardSection from './payment-card'
import { completeOrder } from '../store'
import { connect } from 'react-redux'

class PaymentForm extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({name: this.props.cart.fullName}).then(({token}) => {
      console.log('Received Stripe token:', token)
      this.props.completeOrder(this.props.cart.id, this.props.cart.subTotal, token.id)
    })

    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <button>Confirm order</button>
      </form>
    );
  }
}

const mapState = state => ({cart: state.cart})

const mapDispatch = (dispatch) => ({
  completeOrder: (orderId, amount, token) => {
    dispatch(completeOrder(orderId, amount, token))
  }
})

const PaymentFormConatiner = injectStripe(connect(mapState, mapDispatch)(PaymentForm))

export default PaymentFormConatiner
