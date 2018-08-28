const router = require('express').Router()
const { Order, OrderStatusCode, OrderItem, Product } = require('../db/models')
const { isAllowed, isAdmin } = require('../utils')
module.exports = router

// Get cart instance for logged-in user :: /api/cart/getUserCart/:userId
router.get('/getUserCart/:userId', async (req, res, next) => {
  const orderId = await Order.findOne({
    where: { customerId: req.params.userId, orderStatusCodeId: 1 },
  })
  res.send(orderId)
})

// Destroy cart instance (user has removed all items) :: /api/cart/:orderId
router.delete('/:orderId', async (req, res, next) => {
  const cartId = +req.params.orderId
  try {
    await Order.destroy({ where: { id: cartId } })
    res.json(cartId)
  }
  catch (err) {
    next(err)
  }
})

// Adding item to cart :: /api/cart/:userId/:productId
router.post('/:userId/:productId', async (req, res, next) => {
  try {
    let useThisOrderId;

    // unauthenticated users: Create new order, send orderId with cookie
    if (req.params.userId === `guest`) {

      if (req.cookies.orderId) {
        // console.log(`guest has a cart! ID is ${req.cookies.orderId}`)
        useThisOrderId = req.cookies.orderId
      } else {
        const guestOrder = await Order.create({ orderStatusCodeId: 1 })
        res.cookie('orderId', `${guestOrder.id}`)
        useThisOrderId = guestOrder.id
      }
    } else {
      // If an order with the given `userId` (customerId) and
      // `orderStatusCodeId` of 1 (in-cart) does not exist, create a new
      // cart (order) instance and use that newly created `orderId`
      const existingOrder = await Order.findOne({
        where: {
          customerId: req.params.userId,
          orderStatusCodeId: 1
        }
      })

      // console.log('existingOrder', existingOrder)

      if (!existingOrder) {
        const newOrder = Order.build()
        newOrder.customerId = req.params.userId
        newOrder.orderStatusCodeId = 1
        await newOrder.save()
        useThisOrderId = newOrder.id
        // console.log(`NEW CART CREATED! Order ID is ${useThisOrderId}`)
      } else {
        useThisOrderId = existingOrder.id
        // console.log(`CART EXISTS! Order ID is ${useThisOrderId}`)
      }
    }

    // And now we add the item to the order we've determined to use...
    // Create new instance on OrderItem table between productId and orderId.
    const [item, wasCreated] = await OrderItem.findOrCreate({
      where: {
        productId: req.params.productId,
        orderId: useThisOrderId
      },
      defaults: { quantity: req.body.qty }
    })

    // If instance already exists, update the quantity.
    if (!wasCreated) {
      await OrderItem.update({
        quantity: req.body.qty + item.quantity,
        productId: req.params.productId,
        orderId: useThisOrderId
      }, {
        where: {
          productId: req.params.productId,
          orderId: useThisOrderId
        },
        returning: true,
        plain: true
      })
    }

    res.status(201).json(item)
  } catch (err) {
    next(err)
  }
})

// Editing item in cart :: /api/cart/:orderId/:productId
// Editing OrderItem table -- NOT Order table
router.put('/:orderId/:productId', async (req, res, next) => {
  try {
    const [num, updatedItem] = await OrderItem.update({
      quantity: req.body.qty,
      productId: req.params.productId,
      orderId: req.params.orderId,
      // we have price from product. do we need it saved here?
      price: null
    }, {
      where: {
        productId: req.params.productId,
        orderId: req.params.orderId
      },
      returning: true,
      plain: true
    })
    const dataRequired = await OrderItem.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      },
      include: [{
        model: Product,
        attributes: ['id', 'name', 'price', 'unitsInStock']
      }]
    })
    res.status(201).json(dataRequired)
  } catch (err) {
    next(err)
  }
})


// Deleting item from cart :: /api/cart/:orderId/:productId
// Deleting OrderItem table instance -- NOT the whole Order
router.delete('/:orderId/:productId', async (req, res, next) => {
  const oId = +req.params.orderId
  const pId = +req.params.productId
  try {
    await OrderItem.destroy({
      where: {
        productId: pId,
        orderId: oId
      }
    })
    res.json(pId)
  } catch (err) {
    next(err)
  }
})
