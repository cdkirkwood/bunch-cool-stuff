import axios from 'axios'

//actions
const GET_PRODUCT = 'GET_PRODUCT'
const GET_PRODUCTS = 'GET_PRODUCTS'

//action creators
const getProducts = products => {
  const action = { type: GET_PRODUCTS, products }
  return action
}

//Thunks
export const fetchProducts = () => async(dispatch) => {
  try {
    const response = await axios.get('/api/products')
    dispatch(getProducts(response.data))
  } catch {
    console.error.bind(console)
  }
}

const ProductsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export default ProductsReducer