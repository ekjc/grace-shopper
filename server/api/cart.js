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
    console.log( req.params.orderId, req.params.productId, req.body.qty);
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
    //can't send back the OrderItem instance, need to send back the order??
    const dataRequired = await OrderItem.findOne({
      where: { orderId: req.params.orderId, productId: req.params.productId },
      include: [ {model: Product, attributes: ['id', 'name', 'price', 'unitsInStock']}]
    })
    console.log('^^^^^^^^^^^UPDATED ITEM^^^^^^^^^^^^^', dataRequired);
    res.json(dataRequired)
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
