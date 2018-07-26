const Category = require('../server/db/models/category')

const addresses = [
  {
    street1: '12345 N Street Road',
    street2: 'Apt 4065',
    city: 'Chicago',
    state: 'Illinois',
    zip: '60614',
    country: 'United States'
  },
  {
    street1: '816 W State St',
    city: 'Oklahoma City',
    state: 'Oklahoma',
    zip: '73170',
    country: 'United States'
  },
  {
    street1: '3120 SW 126th Ave.',
    city: 'Cost Mesa',
    state: 'California',
    zip: '90228',
    country: 'United States'
  },
  {
    street1: '909 N 42nd St',
    street2: 'Unit 5',
    city: 'New York City',
    state: 'New York',
    zip: '10294',
    country: 'United States'
  }
]

const users = [
  {
    firstName: 'Courtney',
    lastName: 'Collison',
    email: 'courtney@example.com',
    phone: '5559214829',
    addressId: 2,
    isAdmin: true
  },
  {
    firstName: 'Andy',
    lastName: 'Anderson',
    email: 'andy@example.com',
    phone: '5554207654',
    addressId: 4,
    isAdmin: true
  },
  {
    firstName: 'Eric',
    lastName: 'Erickson',
    email: 'eric@example.com',
    phone: '5552180920',
    addressId: 1,
    isAdmin: false
  },
  {
    firstName: 'Stephanie',
    lastName: 'Stephenson',
    email: 'stephanie@example.com',
    phone: '5556336719',
    addressId: 3,
    isAdmin: false
  }
]

const images = [
  {
    imageUrl: 'http://placehold.it/800x400',
    sortOrder: 1
  },
  {
    imageUrl: 'http://placehold.it/800x400',
    sortOrder: 2
  },
  {
    imageUrl: 'http://placehold.it/800x400',
    sortOrder: 3
  },
  {
    imageUrl: 'http://placehold.it/800x400',
    sortOrder: 4
  }
]

const categories = [
  {
    name: 'Beer',
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Wine',
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Spirits',
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Reds',
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Whites',
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'IPAs',
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Wheat Ales',
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Pilsners',
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Saisons',
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Gin',
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Vodka',
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Tequila',
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Bourbon',
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Whiskey',
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Scotch',
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Cabernet Sauvignon',
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Malbec',
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Merlot',
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Chardonnay',
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Sauvignon Blanc',
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Riesling',
    imageUrl: 'http://placehold.it/800x400'
  }
]

const products = [
  {
    name: 'Lagunitas India Pale Ale',
    price: 8.99,
    description:
      'Pouring a deep golden hue, Lagunitas IPA exudes lovely aromas of bright citrus and resinous pine. A touch of caramel malt is not only a solid nod to the style’s heritage, but it also provides balance and drinkability. Despite being famous for some monstrously hoppy brews, this iconic IPA is a lasting reminder that Lagunitas brews quaffable ales just as well. 6.2% ABV 51.5 IBU',
    SKU: 811548,
    unitsInStock: 200,
    quantityPerUnit: 6,
    categories: [1, 8]
  },
  {
    name: 'Goose Island 312',
    price: 15.99,
    description:
      'Hazy straw yellow color. Zesty lemon-orange cake, pine, and custard aromas with a crisp, dryish medium body and a tangy wafer, melon, and bib lettuce accented finish. Tasty.',
    SKU: 811555,
    unitsInStock: 400,
    quantityPerUnit: 12,
    categories: [1, 6]
  },
  {
    name: 'Colome Malbec 2015',
    price: 19.99,
    description:
      'Refined and rich-tasting, with effusive minerality to the red berry and cherry flavors, lathered with plenty of creamy accents. Pepper and cigar box notes show on the long and complex finish. Drink now through 2022. 27,300 cases made.',
    SKU: 558933,
    unitsInStock: 50,
    quantityPerUnit: 1,
    categories: [2, 4, 17]
  },
  {
    name: 'Charles Smith Wines Kung Fu Girl 2016',
    price: 8.99,
    description:
      'A fun quaff, with floral nectarine and lime flavors that dance agilely on a sleek and succulent finish. Drink now. 185,000 cases made.',
    SKU: 550091,
    unitsInStock: 80,
    quantityPerUnit: 1,
    categories: [2, 5, 21]
  },
  {
    name: 'Grey Goose',
    price: 24.99,
    description:
      'Medium-bodied. Anise, citrus peel, herbs, minerals. Soft, rounded texture. Plush palate with a delicate edge. Shows off rich fruit elements surrounded by beautiful aromatics. A sensational, elegant drink.',
    SKU: 994573,
    unitsInStock: 1000,
    quantityPerUnit: 1,
    categories: [3, 11]
  },
  {
    name: `Hendrick's Gin`,
    price: 26.99,
    description:
      'Clear. Polished aromas of fresh citrus, herbal juniper, flower petal and cucumber follow through on bright, silky entry to a dry-yet-fruity medium-to-full body with violet, lavender, and pink peppercorn notes resonating brightly. Finishes with a delicate sweet citrus custard pastry, spice, potpourri, and mineral fade all in fine balance. A delightfully fruity, floral nouveau gin for artisan cocktails.',
    SKU: 994590,
    unitsInStock: 1000,
    quantityPerUnit: 1,
    categories: [3, 10]
  }
]

const orderStatusCodes = [
  {
    description: 'in-cart'
  },
  {
    description: 'processing'
  },
  {
    description: 'shipped'
  },
  {
    description: 'completed'
  }
]

const orders = [
  {
    email: 'jjj@gmail.com',
    phoneNumber: '555-900-3455',
    addressId: 1,
    orderStatusCodeId: 1,
    products: [6, 5]
  },
  {
    email: 'www@gmail.com',
    phoneNumber: '777-220-6791',
    addressId: 4,
    orderStatusCodeId: 1,
    products: [1]
  },
  {
    orderStatusCodeId: 1,
    products: [2, 3, 5]
  },
  {
    orderStatusCodeId: 1,
    products: [4, 1]
  }
]

module.exports = {
  orderStatusCodes,
  orders,
  addresses,
  users,
  categories,
  images,
  products
}
