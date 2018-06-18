import React, { Component } from 'react'
import { editProduct, createProduct } from '../store'
import {connect} from 'react-redux'


class ProductForm extends Component {
  constructor(props) {
    super(props)
    //this.handleSubmit = this.handleSubmit.bind(this)
  }

  render() {
    // const product = this.props.products ?
    // this.props.products.find(elem => elem.id === 1) : {}
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Add Product</h1>
        <input required name="name" type="text" placeholder="name" />
        <input name="description" type="text" placeholder="description" />
        <input name="price" type="text" placeholder="price" />
        <input name="stock" type="text" placeholder="stock" />
        <input name="variety" type="text" placeholder="variety" />
        <button type="onSubmit">Add</button>
      </form>

    )
  }
}

export default ProductForm



