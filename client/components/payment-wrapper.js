import React from 'react'
import {Elements} from 'react-stripe-elements';

import InjectedCheckoutForm from './payment-form';

const MyStoreCheckout = () => (
  <Elements>
    <InjectedCheckoutForm />
  </Elements>
)

export default MyStoreCheckout;
