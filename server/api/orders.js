const router = require('express').Router()
const {Order, OrderQuantity} = require('../db/models')
const asyncHandler = require('express-async-handler')
module.exports = router

router.get('/', asyncHandler(async (req, res, next) => {
  const userId = req.query.userId
  const orders = await (typeof (userId) === 'number' ?
    Order.scope('populated').findAll( {where: { userId }})
    : Order.scope('populated').findById(req.session.orderId))
  res.json(orders)
}))

router.post('/', asyncHandler(async (req, res, next) => {
    const { userId, productId, quantity } = req.body
    let order
    if (!userId) order = await Order.create()
    else order = await Order.create({ userId })
    await OrderQuantity.create({
      orderId: order.id, productId, quantity
    })
    req.session.orderId = order.id
    res.send(order)
}))

router.put('/:id', asyncHandler(async(req, res, next) => {
  const { productId, quantity } = req.body
  const orderId = +req.params.id
  const item = await OrderQuantity.findOrCreate({
    where: { productId, orderId},
    defaults: { quantity }
  })
  const newQuantity = quantity + item[0].quantity
  if (!item[1]) await item[0].update({ quantity: newQuantity })
  const order = await Order.scope('populated').findById(orderId)
  res.json(order)
}))

router.put('/:id/pending', asyncHandler(async (req, res, next) => {
  const { fullName, shippingAddress } = req.body
  const order = await Order.scope('populated').findById(+req.params.id)
  const updated = await order.update({ fullName, shippingAddress })
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

router.delete('/:id', asyncHandler(async(req, res, next) => {
  await Order.destroy({ where: { id: +req.params.id } })
  res.status(204).json('order deleted')
}))

