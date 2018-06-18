const router = require('express').Router()
const stripe = require('stripe')(
  process.env.STRIPE_SECRET_KEY
)

module.exports = router

router.post('/', (req, res, next) => {
  const amount = req.body.amount * 100
  stripe.charges.create({
    amount,
    currency: 'usd',
    source: req.body.token, // obtained with Stripe.js
    description: 'Charge for daniel.harris@example.com'
  }, (err, charge) => {
    if (err) next(err)
    else res.send(charge)
  })
})
