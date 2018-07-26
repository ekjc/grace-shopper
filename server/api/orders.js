const router = require('express').Router()
const { Order, OrderStatusCode, OrderItem } = require('../db/models')
module.exports = router


// Get all orders :: /api/orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  }
  catch (err) {
    console.error(err)
    next(err)
  }
})

// Get order by id :: /api/orders/:orderId
router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId)
    res.json(order)
  }
  catch (err) {
    console.error(err)
    next(err)
  }
})

// Create new "order" e.g. cart instance :: /api/orders/newOrder
router.post('/newOrder', async (req, res, next) => {
  try {
    const newOrder = await Order.create({
      email: req.body.email,
      phoneNumber: req.body.email,
      date: req.body.date,
      //etc. products
    })
    res.json(newOrder)
  }
  catch (err) {
    console.error(err)
    next(err)
  }
})

// Edit order :: /api/orders/:orderId/editOrder
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

//Process from "cart" to "order" :: /api/orders/:orderId/processOrder
router.put('/:orderId', async (req, res, next) => {
  try {
    const processedOrder = await Order.update({
      orderNumber: Order.generateOrderNumber(),
      email: req.body.email,
      phoneNumber: req.body.email,
      date: req.body.date,
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


//Adding item to cart :: /api/orders/addToCart/:orderId/:productId
router.post('/addToCart/:orderId/:productId', async (req, res, next) => {
  try {
    const newItemInCart = await OrderItem.create({
      orderId: req.params.orderId,
      productId: req.params.productId,
      quantity: req.body.quantity,
      price: req.body.price
    })
    res.json(newItemInCart)
  } catch (err) {
    console.error(err)
    next(err)
  }
})
