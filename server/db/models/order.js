const Sequelize = require('sequelize');
const db = require('../db');
const OrderQuantity = require('./orderQuantity')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'active'
  },
  orderedOn: {
    type: Sequelize.DATE,
  },
  shippedOn: {
    type: Sequelize.DATE,
  },
  arrivedOn: {
    type: Sequelize.DATE,
  },
  fullName: {
    type: Sequelize.STRING
  },
  shippingAddress: {
    type: Sequelize.TEXT
  }
}, {
    getterMethods: {
      subTotal() {
        if (this.superpowers) {

          return this.superpowers.reduce((total, power) => {
            total += power.price * power['order-quantity'].quantity
            return total;
          }, 0)
        }
      }
    },
    scopes: {
      populated: {
        include: [
          {all: true, nested: true}
        ]
      }
    }
  });

Order.beforeDestroy(order => {
  OrderQuantity.destroy({
    where: { orderId: order.id }
  })
})

module.exports = Order;
