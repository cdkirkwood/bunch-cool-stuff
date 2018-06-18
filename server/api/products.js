const router = require('express').Router()
const {Product} = require('../db/models')
const asyncHandler = require('express-async-handler')
module.exports = router

router.get('/', asyncHandler(async (req, res, next) => {
  const products = await Product.scope('populated').findAll()
  res.json(products)
}))

router.post('/', asyncHandler(async (req, res, next) => {
  const product = await Product.scope('populated').create(req.body)
  res.json(product)
}))

router.put('/:id', asyncHandler(async (req, res, next) => {
  const product = await Product.scope('populated').findOne(req.params.id)
  const updated = await product.scope('populated').update(req.body)
  res.json(updated)
}))

router.delete('/:id', asyncHandler(async(req, res, next) => {
  const product = await Product.findOne(req.params.id)
  await product.destroy()
  res.status(204).json('deleted')
}))
