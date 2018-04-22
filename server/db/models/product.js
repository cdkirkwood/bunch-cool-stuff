const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL
  },
  description: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  stock: {
    type: Sequelize.INTEGER
  },
  variety: {
    type: Sequelize.STRING
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
  }
}, {
  scopes: {
    populated: {
      include: [
        {all: true, nested: true}
      ]
    }
  }
})

Product.findByTag = (tag) => {
  return Product.findAll({
    where: {
      tags: {
        $contains: [tag]
      }
    }
  })
}

module.exports = Product
