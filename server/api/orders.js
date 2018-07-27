const router = require('express').Router()
const { Order, OrderStatusCode, OrderItem, Product, User } = require('../db/models')
module.exports = router


// Get all orders/cart instances :: /api/orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [ {model: OrderStatusCode, attributes: ['description']}, {model: User, as: 'customer'}]
    })
    res.json(orders)
  }
  catch (err) {
    console.error(err)
    next(err)
  }
})

// Get items on a specific cart/order instance :: /api/orders/:orderId/items
router.get('/:orderId/items', async (req, res, next) => {
  try {
    const orderItems = await OrderItem.findAll({
      where: { orderId: req.params.orderId },
      include: [ {model: Product, attributes: ['id', 'name', 'price', 'unitsInStock']}]
    })
    res.json(orderItems)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

// Get order/cart instance by id :: /api/orders/:orderId
router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId,
    {include: [ {model: OrderStatusCode, attributes: ['description']}, {model: User, as: 'customer'} ]})
    res.json(order)
  }
  catch (err) {
    console.error(err)
    next(err)
  }
})


//Process a "cart" instance into an "order" instance :: /api/order/:orderId/processOrder
router.put('/:orderId', async (req, res, next) => {
  try {
    const processedOrder = await Order.update({
      orderNumber: Order.generateOrderNumber(), //this will prob need to be changed
      //...
    },
    {
      where: { id: req.params.productId },
      returning: true,
      plain: true
    })
    res.json(processedOrder)
  }
  catch (err) {
    console.error(err)
    next(err)
  }
})


// Edit order (for admin?) :: /api/orders/:orderId/editOrder
router.put('/:orderId', async (req, res, next) => {
  try {
    const updatedOrder = await Order.update({
      email: req.body.email,
      phoneNumber: req.body.email,
      date: req.body.date,
      //etc. products
    },
    {
      where: { id: req.params.productId },
      returning: true,
      plain: true
    })
    res.json(updatedOrder)
  }
  catch (err) {
    console.error(err)
    next(err)
  }
})
