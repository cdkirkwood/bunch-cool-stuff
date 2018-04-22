const User = require('./user')
const Order = require('./order')
const OrderQuantity = require('./orderQuantity')
const Product = require('./product')

User.hasMany(Order)
Order.belongsTo(User)

Order.belongsToMany(Product, {through: OrderQuantity })
Product.belongsToMany(Order, {through: OrderQuantity })

module.exports = {
  User,
  Order,
  OrderQuantity,
  Product
}
