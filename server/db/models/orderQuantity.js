const Sequelize = require('sequelize');
const db = require('../db');

const OrderQuantity = db.define('orderQuantity', {
  quantity: {
    type: Sequelize.INTEGER,
  },
},
);

module.exports = OrderQuantity;
