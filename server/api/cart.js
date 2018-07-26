const router = require('express').Router()
const { Order, OrderStatusCode, OrderItem } = require('../db/models')
module.exports = router


// Create new "order" e.g. cart instance :: /api/cart/newCart
router.post('/newCart', async (req, res, next) => {
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

//Adding item to cart :: /api/cart/addToCart/:orderId/:productId
//This creates a new instance on the OrderItem join table btwn product & order ids
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

//Editing item in cart :: /api/cart/editCart/:orderId/:productId
//Editing OrderItem table -- NOT Order table
router.put('/addToCart/:orderId/:productId', async (req, res, next) => {
  try {
    const updatedItem = await OrderItem.update({
     //....
    })
    res.json(updatedItem)
  } catch (err) {
    console.error(err)
    next(err)
  }
})


//Deleting item from cart :: /api/cart/deleteItem/:orderId/:productId
//Deleting OrderItem table instance -- NOT the whole Order
router.delete('/addToCart/:orderId/:productId', async (req, res, next) => {
  try {
    const updatedItem = await OrderItem.destroy({
      //...
    })
    res.json(updatedItem)
  } catch (err) {
    console.error(err)
    next(err)
  }
})
