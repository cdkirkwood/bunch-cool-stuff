import axios from 'axios'
import asyncCatcher from 'async-handler-middleware'

//actions
const GET_PRODUCTS = 'GET_PRODUCTS'

//action creators
const getProducts = products => {
  const action = { type: GET_PRODUCTS, products }
  return action
}

//Thunks
export const fetchProducts = () => asyncCatcher(async (dispatch) => {
  const response = await axios.get('/api/products')
  dispatch(getProducts(response.data))
})

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export default productsReducer
