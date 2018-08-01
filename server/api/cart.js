const router = require('express').Router()
const { Order, OrderStatusCode, OrderItem, Product } = require('../db/models')
const { isAllowed, isAdmin } = require('../utils')
module.exports = router

/* THIS IS NOT IN USE -- NEW CART GETS CREATED UPON ADDING ITEM - SEE BELOW */
// Create new "order" e.g. cart instance :: /api/cart
// router.post('/', async (req, res, next) => {
//   try {
//     const newOrder = await Order.create({
//       email: req.body.email,
//       phoneNumber: req.body.email,
//       date: req.body.date,
//       //etc. products
//     })
//     res.status(201).json(newOrder)
//   }
//   catch (err) {
//     console.error(err)
//     next(err)
//   }
// })

//Get a cart instance for a user that is logged-in :: /api/cart/getUserCart/:userId
router.get('/getUserCart/:userId', async (req, res, next) => {
  const orderId = await Order.findOne({
    where: { customerId: req.params.userId, orderStatusCodeId: 1 },
  })
  console.log('ORDER ID^^^^^^^^^^^^^^^^^^^^^^^^', orderId);
  res.send(orderId)
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
/*eslint-disable*/
// Adding item to cart :: /api/cart/:userId/:productId
router.post('/:userId/:productId', async (req, res, next) => {
  try {
    let useThisOrderId;

    /* handling unauthenticated users: Create new order, send order id back as part of cookie */
    if (req.params.userId === `guest`) {
      console.log('COOKIE PARSER SAYS....', req.cookies);
      if (!req.cookies.orderId) {
        const guestOrder = await Order.create({
          orderStatusCodeId: 1
        })
        res.cookie('orderId', `${guestOrder.id}`) //send('cookies set') //set cookie for their orderId
        useThisOrderId = guestOrder.id
      } else {
          const doesOrderExist = await Order.findById(req.cookies.orderId)
          if (!doesOrderExist) {
            const newOrder = Order.build()
            newOrder.orderStatusCodeId = 1
            await newOrder.save()
            useThisOrderId = newOrder.id
            res.cookie('orderId', `${newOrder.id}`)
            console.log(req.cookies)
          } else {
          console.log(`guest already has a cart, adding item to order #${req.cookies.orderId}`);
          useThisOrderId = req.cookies.orderId
          }
        }
    }

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
    res.status(201).json(item)
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
