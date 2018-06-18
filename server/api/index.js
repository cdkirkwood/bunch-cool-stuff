const router = require('express').Router()
module.exports = router

router.use((req, res, next) => {
  console.log(req.query.token)
  if (req.query.token === '1234') {
    next()
  } else {
    res.redirect('/')
  }
})
router.use('/users', require('./users'))
router.use('/orders', require('./orders'))
router.use('/products', require('./products'))
router.use('/stripe', require('./stripe'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
