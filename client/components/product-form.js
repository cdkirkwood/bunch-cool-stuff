import React, { Component } from 'react'
import { editProduct, createProduct } from '../store'
import {connect} from 'react-redux'


class ProductForm extends Component {

  render() {
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



