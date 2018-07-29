const Address = require('../server/db/models/address')
const Category = require('../server/db/models/category')
const Image = require('../server/db/models/image')
const OrderItem = require('../server/db/models/order-item')
const OrderStatusCode = require('../server/db/models/order-status-code')
const Order = require('../server/db/models/order')
const Product = require('../server/db/models/product')
const Review = require('../server/db/models/review')
const User = require('../server/db/models/user')
const {
  addresses,
  users,
  beerCategories,
  wineCategories,
  liquorCategories,
  images,
  products,
  reviews,
  orders,
  orderStatusCodes
} = require('./dummyData')
const db = require('../server/db')

const seed = async () => {
  try {
    await db.sync({ force: true })

    await Promise.all(addresses.map(address => Address.create(address)))
    await Promise.all(users.map(user => User.create(user)))
    await Promise.all(images.map(image => Image.create(image)))

    // enforce categories to be created in this order
    const beer = await Category.create({ name: 'Beer' })
    const wine = await Category.create({ name: 'Wine' })
    const liquor = await Category.create({ name: 'Liquor' })

    // then add beer subcategories
    await Promise.all(beerCategories.map(cat => beer.addChild(cat)))

    // then add wine subcategories without a parent
    await Promise.all(
      wineCategories.map(cat => {
        if (!cat.parent) {
          return wine.addChild(cat)
        }
      })
    )

    // then add wine subcategories _with_ a parent
    await Promise.all(
      wineCategories.map(async cat => {
        if (cat.parent) {
          const parentCat = await Category.findOne({
            where: { name: cat.parent }
          })
          return await parentCat.addChild(cat)
        }
      })
    )

    // then add liquor subcategories without a parent
    await Promise.all(
      liquorCategories.map(cat => {
        if (!cat.parent) {
          return liquor.addChild(cat)
        }
      })
    )

    // then add liquor subcategories _with_ a parent
    await Promise.all(
      liquorCategories.map(async cat => {
        if (cat.parent) {
          const parentCat = await Category.findOne({
            where: { name: cat.parent }
          })
          return await parentCat.addChild(cat)
        }
      })
    )

    await Promise.all(
      products.map(async product => {
        const newProduct = await Product.create(product)
        const categoriesFromDB = await Category.findAll({
          where: {
            name: { $or: product.categories }
          }
        })
        await newProduct.addCategory(categoriesFromDB)
      })
    )
    // await Promise.all(reviews.map(review => Review.create(review)))
    await Promise.all(
      orderStatusCodes.map(code => OrderStatusCode.create(code))
    )
    await Promise.all(
      orders.map(async order => {
        const newOrder = await Order.create(order)
        const productFromDB = await Product.findAll({
          where: {
            id: { $or: order.products }
          }
        })
        await newOrder.addProduct(productFromDB)
      })
    )
  } catch (error) {
    console.error('*** seed failed!', error)
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

seed()
