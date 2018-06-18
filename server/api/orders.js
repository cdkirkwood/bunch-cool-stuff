const router = require('express').Router()
const { Order, OrderQuantity } = require('../db/models')
const asyncHandler = require('express-async-handler')
module.exports = router

router.get('/', asyncHandler(async (req, res, next) => {
  const userId = req.query.userId
  const admin = req.query.admin
  const orders = await (admin ?
    Order.scope('populated').findAll()
    : Order.scope('populated').findAll({ where: { userId } }))
  res.json(orders)
}))

router.get('/cart', asyncHandler(async (req, res, next) => {
  const userId = +req.query.userId
  let cart
  if (!isNaN(userId)) {
    cart = await Order.scope('populated').findOne({ where: { userId, status: 'active' } })
  } else {
    cart = await Order.scope('populated').findOne({
        where: {id: req.session.orderId, status: 'active'}
      })
      || {}
  }
  res.json(cart)
}))

router.post('/', asyncHandler(async (req, res, next) => {
  const { userId, productId, quantity } = req.body
  const order = await Order.scope('populated').create({ userId })
  await OrderQuantity.create({
    orderId: order.id, productId, quantity
  })
  const newOrder = await Order.scope('populated').findById(order.id)
  req.session.orderId = order.id
  res.send(newOrder)
}))

router.put('/:id', asyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body
  const orderId = +req.params.id
  const item = await OrderQuantity.findOrCreate({
    where: { productId, orderId },
    defaults: { quantity }
  })
  const newQuantity = quantity + item[0].quantity
  if (!item[1]) {
    if (!quantity) await item[0].destroy()
    else await item[0].update({ quantity: newQuantity })
  }
  const order = await Order.scope('populated').findById(orderId)
  res.json(order)
}))

router.put('/:id/pending', asyncHandler(async (req, res, next) => {
  const { fullName, shippingAddress, emailAddress } = req.body
  const order = await Order.scope('populated').findById(+req.params.id)
  const updated = await order.update({ fullName, shippingAddress, emailAddress })
  res.json(updated)
}))

router.put('/:id/complete', asyncHandler(async (req, res, next) => {
  const order = await Order.scope('populated').findById(+req.params.id)
  const updated = await order.update({
    status: 'ordered',
    orderedOn: new Date()
  })
  res.json(updated)
}))

router.delete('/:id', asyncHandler(async (req, res, next) => {
  await Order.destroy({ where: { id: +req.params.id } })
  res.status(204).json('order deleted')
}))

