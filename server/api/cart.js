const router = require('express').Router()
const { Order, OrderStatusCode, OrderItem, Product } = require('../db/models')
module.exports = router


// Create new "order" e.g. cart instance :: /api/cart
router.post('/', async (req, res, next) => {
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

// Destroy cart instance (user has removed all items) :: /api/cart/:orderId
router.delete('/:orderId', async (req, res, next) => {
  const cartId = +req.params.orderId
  try {
    await Order.destroy({where: { id: cartId }})
    res.json(cartId)
  }
  catch (err) {
    console.error(err)
    next(err)
  }
})

// Adding item to cart :: /api/cart/:userId/:productId
router.post('/:userId/:productId', async (req, res, next) => {
  try {
    let useThisOrderId;

    /* placeholder for handling unauthenticated users */
    if (req.params.userId === `guest`) console.log('please log in for testing');

    else {
    /* if an order with the userId (e.g. customerId) passed in and an orderStatusCodeId of 1 does not exist,
    create new cart (e.g. order) instance and use that newly created orderId */
    const doesOrderExist = await Order.findOne({
      where: {customerId: req.params.userId}, orderStatusCodeId: 1})

    if (!doesOrderExist) {
      const newOrder = Order.build()
      newOrder.customerId = req.params.userId
      newOrder.orderStatusCodeId = 1
      await newOrder.save()
      useThisOrderId = newOrder.id
      console.log(`NEW CART CREATED, NOW USING ${useThisOrderId} AS THE ORDER ID`)
    } else {
      useThisOrderId = doesOrderExist.id
      console.log(`CART ALREADY EXISTED, NOW USING ${useThisOrderId} AS THE ORDER ID`)
    }

    /*Take care of adding the item to the order that either existed or was just created,
    Creates a new instance on the OrderItem join table btwn productId & orderId.
    If there already is one, it updates the quantity*/
    const [item, wasCreated] = await OrderItem.findOrCreate({
      where: { productId: req.params.productId, orderId: useThisOrderId },
      defaults: { quantity: req.body.qty }
    })
    if (!wasCreated) {
        await OrderItem.update({
        quantity: req.body.qty + item.quantity, // if already exists, add to current quantity in cart
        productId: req.params.productId,
        orderId: useThisOrderId
      }, {
        where: { productId: req.params.productId, orderId: useThisOrderId },
        returning: true,
        plain: true
      })
    }
    res.json(item)
    }
  } catch (err) {
    console.error(err)
    next(err)
  }
})

//Editing item in cart :: /api/cart/:orderId/:productId
//Editing OrderItem table -- NOT Order table
router.put('/:orderId/:productId', async (req, res, next) => {
  try {
    const [num, updatedItem] = await OrderItem.update({
      quantity: req.body.qty,
      productId: req.params.productId,
      orderId: req.params.orderId,
      price: null /* we have price from the product, not sure we need it on the OrderItem model */
    },{
      where: { productId: req.params.productId, orderId: req.params.orderId },
      returning: true,
      plain: true
    })
    const dataRequired = await OrderItem.findOne({
      where: { orderId: req.params.orderId, productId: req.params.productId },
      include: [ {model: Product, attributes: ['id', 'name', 'price', 'unitsInStock']}]
    })
    res.json(dataRequired)
  } catch (err) {
    console.error(err)
    next(err)
  }
})


//Deleting item from cart :: /api/cart/:orderId/:productId
//Deleting OrderItem table instance -- NOT the whole Order
router.delete('/:orderId/:productId', async (req, res, next) => {
  // const productId = +req.params.productId
  try {
    await OrderItem.destroy({
      where: { productId: req.params.productId, orderId: req.params.orderId },
    })
    res.json(req.params.productId)
  } catch (err) {
    console.error(err)
    next(err)
  }
})
