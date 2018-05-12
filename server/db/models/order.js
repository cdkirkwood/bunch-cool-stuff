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
  },
  emailAddress: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  }
}, {
    getterMethods: {
      subTotal() {
        if (this.products) {

          return this.products.reduce((total, product) => {
            total += product.price * product.orderQuantity.quantity
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
