const router = require('express').Router()
const { Order, OrderStatusCode, OrderItem } = require('../db/models')
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

//Adding item to cart :: /api/cart/:orderId/:productId
//This creates a new instance on the OrderItem join table btwn product & order ids
router.post('/:orderId/:productId', async (req, res, next) => {
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

//Editing item in cart :: /api/cart/:orderId/:productId
//Editing OrderItem table -- NOT Order table
router.put('/:orderId/:productId', async (req, res, next) => {
  try {
    const [rows, updatedItem] = await OrderItem.update({
      quantity: req.body.quantity,
      price: req.body.price
    },
      { where:{
        productId: req.params.productId,
        orderId: req.params.orderId,
      }})
    res.json(updatedItem)
  } catch (err) {
    console.error(err)
    next(err)
  }
})


//Deleting item from cart :: /api/cart/:orderId/:productId
//Deleting OrderItem table instance -- NOT the whole Order
router.delete('/:orderId/:productId', async (req, res, next) => {
  const productId = +req.params.productId
  try {
    await OrderItem.destroy({
      where: { productId }
    })
    res.json(productId)
  } catch (err) {
    console.error(err)
    next(err)
  }
})