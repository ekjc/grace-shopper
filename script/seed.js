'use strict'

const db = require('../server/db')
const Op = require('sequelize').Op
const {
  Address,
  Category,
  Image,
  OrderStatusCode,
  Product,
  Review,
  User
} = require('../server/db/models')
const {
  addresses,
  users,
  beerCategories,
  wineCategories,
  liquorCategories,
  images,
  products,
  reviews,
  orderStatusCodes
} = require('./dummyData')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  //
  // ADDRESSES
  // =========
  const seedAdrs = await Promise.all(addresses.map(adr => Address.create(adr)))
  console.log(`seeded ${seedAdrs.length} addresses`)

  //
  // USERS
  // =====
  const seedUsers = await Promise.all(users.map(usr => User.create(usr)))
  console.log(`seeded ${seedUsers.length} users`)

  //
  // IMAGES
  // ======
  const seedImages = await Promise.all(images.map(img => Image.create(img)))
  console.log(`seeded ${seedImages.length} images`)

  //
  // CATEGORIES
  // ==========

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

  //
  // PRODUCTS
  // ========
  const seedProducts = await Promise.all(
    products.map(async product => {
      const newProduct = await Product.create(product)
      const categoriesFromDB = await Category.findAll({
        where: {
          name: { [Op.or]: product.categories }
        }
      })
      await newProduct.addCategory(categoriesFromDB)
    })
  )
  console.log(`seeded ${seedProducts.length} products`)

  //
  // REVIEWS
  // =======
  const seedReviews = await Promise.all(reviews.map(async review => {
    const newReview = await Review.create(review)
    const product = await Product.findOne({
      where: {
        name: { [Op.or]: review.product }
      }
    })
    await newReview.setProduct(product)
  }))
  console.log(`seeded ${seedReviews.length} reviews`)

  //
  // ORDERS
  // ======
  await Promise.all(
    orderStatusCodes.map(code => OrderStatusCode.create(code))
  )

  console.log(`seeded successfully!`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
