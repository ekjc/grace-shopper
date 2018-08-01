const router = require('express').Router()
const {
  Order,
  OrderStatusCode,
  OrderItem,
  Product,
  User,
  Address
} = require('../db/models')
const { isAllowed, isAdmin } = require('../utils')
module.exports = router
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// Get all orders/cart instances :: /api/orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: OrderStatusCode, attributes: ['description'] },
        { model: User, as: 'customer' }
      ]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// Get items on a specific cart/order instance :: /api/orders/:orderId/items
router.get('/:orderId/items', async (req, res, next) => {
  try {
    const orderItems = await OrderItem.findAll({
      where: { orderId: req.params.orderId },
      include: [
        { model: Product, attributes: ['id', 'name', 'price', 'unitsInStock'] }
      ]
    })
    res.json(orderItems)
  } catch (err) {
    next(err)
  }
})

// Get order/cart instance by id :: /api/orders/:orderId
router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId, {
      include: [
        { model: OrderStatusCode, attributes: ['description'] },
        { model: User, as: 'customer' }
      ]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

// Route address /api/orders/user/:userId
router.get('/user/:userId', async (req, res, next) => {
  try {
    const userId = +req.params.userId
    const orders = await Order.findAll({
      where: {
        customerId: userId,
        // orderStatusCodeId: {
        //   [Op.ne]: 1
        // }
        // orderStatusCodeId: { $ne: 1 }
      },
      include: [
        { model: OrderStatusCode, attributes: ['description'] },
        { model: User, as: 'customer' },
      ]
    })
    console.log('*********** ORDERS', orders)
    res.json(orders)
  } catch(err) {
    next(err)
  }
})

// Turn "cart" instance into "order" instance :: /api/orders/:orderId/process
// 1. Change status code 2. assign an order number (if not present) 3. Create date of order
router.put('/:orderId/process', async (req, res, next) => {
  try {
    const [orderAddress, wasCreated] = await Address.findOrCreate({
      where: { street1: req.body.street1, street2: req.body.street2, },
      defaults: {
        street2: req.body.street2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
      }
    })

    // grab address id to connect to order
    const addressId = orderAddress.id

    // find the cart id and turn it into an "order"
    const orderToProcess = await Order.findById(req.params.orderId)
    console.log('******** orderToProcess', orderToProcess)
    if (!orderToProcess.orderNumber) {
      orderToProcess.generateOrderNumber(orderToProcess)
    }
    orderToProcess.orderStatusCodeId = 3
    orderToProcess.date = new Date()
    orderToProcess.email = req.body.email
    orderToProcess.phoneNumber = req.body.phone
    orderToProcess.addressId = addressId
    await orderToProcess.save()

    res.status(201).json(orderToProcess)
  } catch (err) {
    next(err)
  }
})


// Edit order (for admin?) :: /api/orders/:orderId/editOrder
router.put('/:orderId/editOrder', isAdmin, async (req, res, next) => {
  try {
    const updatedOrder = await Order.update(
      {
        email: req.body.email,
        phoneNumber: req.body.email,
        customerId: req.body.customerId,
        addressId: req.body.addressId,
        orderStatusCodeId: req.body.orderStatusCodeId
      },
      {
        where: { id: req.params.orderId },
        returning: true,
        plain: true
      }
    )
    res.status(201).json(updatedOrder)
  } catch (err) {
    next(err)
  }
})
