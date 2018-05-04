import axios from 'axios'
import asyncCatcher from '../async-catcher'

//actions

const GET_CART = 'GET_CART'
const CREATE_CART = 'CREATE_CART'
const ADD_TO_CART = 'ADD_TO_CART'

//action creators
const getCart = cart => {
  const action = { type: GET_CART, cart }
  return action
}

const createCart = cart => {
  const action = { type: CREATE_CART, cart }
  return action
}

const addToCart = cart => {
  const action = { type: ADD_TO_CART, cart}
  return action
}

//Thunks
export const fetchCart = userId => asyncCatcher(async (dispatch) => {
  const response = await axios.get(`/api/orders/cart?userId=${userId}`)
  dispatch(getCart(response.data))
})

export const postCart = (userId, productId, quantity) => asyncCatcher(async (dispatch) => {
  const response = await axios.post('/api/orders', { userId, productId, quantity })
  dispatch(createCart(response.data))
})

export const editCart = (orderId, productId, quantity) => asyncCatcher(async (dispatch) => {
  const response = await axios.put(`/api/orders/${orderId}`, { productId, quantity })
  dispatch(addToCart(response.data))
})

const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case CREATE_CART:
      return action.cart
    case ADD_TO_CART:
      return action.cart
    default:
      return state
  }
}

export default cartReducer
