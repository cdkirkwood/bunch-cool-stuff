import React from 'react'
import { connect } from 'react-redux';

const Summary = (props) => {
  return props.cart.id ?
    (
      <div className="summary-conatiner">
        <h3>Summary</h3>
        {props.cart.products.map(product => (
          <div key={product.id} className="summary-card">
            <h4>{product.name}</h4>
            <h4>${+product.price * product.orderQuantity.quantity}</h4>
          </div>
        ))}
      </div>
    )
    : <h3>...Loading</h3>
}

const mapState = state => ({cart: state.cart})

const SummaryContainer = connect(mapState)(Summary)

export default SummaryContainer
