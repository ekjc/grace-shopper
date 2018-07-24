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
    firstName: 'Cody',
    lastName: 'Cook',
    email: 'cody@example.com',
    password: 'abc123',
    phone: '5559214829',
    addressId: 2,
    isAdmin: true
  },
  {
    firstName: 'Andy',
    lastName: 'Admin',
    email: 'andy@example.com',
    password: 'abc123',
    phone: '5554207654',
    addressId: 4,
    isAdmin: true
  },
  {
    firstName: 'Eric',
    lastName: 'Erickson',
    email: 'eric@example.com',
    password: 'abc123',
    phone: '5552180920',
    addressId: 1,
    isAdmin: false
  },
  {
    firstName: 'Stephanie',
    lastName: 'Stephenson',
    email: 'stephanie@example.com',
    password: 'abc123',
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
    name: 'Beer', // 1
    parentId: null,
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Wine', // 2
    parentId: null,
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Spirits', // 3
    parentId: null,
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Reds', // 4
    parentId: 2,
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Whites', // 5
    parentId: 2,
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'IPAs', // 6
    parentId: 1,
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Wheat Ales', // 7
    parentId: 1,
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Pilsners', // 8
    parentId: 1,
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Saisons', // 9
    parentId: 1,
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Gin', // 10
    parentId: 3,
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Vodka', // 11
    parentId: 3,
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Tequila', // 12
    parentId: 3,
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Bourbon', // 13
    parentId: 3,
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Whiskey', // 14
    parentId: 3,
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Scotch', // 15
    parentId: 3,
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Cabernet Sauvignon', //16
    parentId: 4,
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Malbec', // 17
    parentId: 4,
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Merlot',
    parentId: 4,
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Chardonnay',
    parentId: 5,
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Sauvignon Blanc',
    parentId: 5,
    imageUrl: 'http://placehold.it/800x400'
  },
  {
    name: 'Riesling', // 21
    parentId: 5,
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
    categoryId: 5
  },
  {
    name: 'Goose Island 312',
    price: 15.99,
    description:
      'Hazy straw yellow color. Zesty lemon-orange cake, pine, and custard aromas with a crisp, dryish medium body and a tangy wafer, melon, and bib lettuce accented finish. Tasty.',
    SKU: 811555,
    unitsInStock: 400,
    quantityPerUnit: 12,
    categoryId: 7
  },
  {
    name: 'Colome Malbec 2015',
    price: 19.99,
    description:
      'Refined and rich-tasting, with effusive minerality to the red berry and cherry flavors, lathered with plenty of creamy accents. Pepper and cigar box notes show on the long and complex finish. Drink now through 2022. 27,300 cases made.',
    SKU: 558933,
    unitsInStock: 50,
    quantityPerUnit: 1,
    categoryId: 17
  },
  {
    name: 'Charles Smith Wines Kung Fu Girl 2016',
    price: 8.99,
    description:
      'A fun quaff, with floral nectarine and lime flavors that dance agilely on a sleek and succulent finish. Drink now. 185,000 cases made.',
    SKU: 550091,
    unitsInStock: 80,
    quantityPerUnit: 1,
    categoryId: 21
  },
  {
    name: 'Grey Goose',
    price: 24.99,
    description:
      'Medium-bodied. Anise, citrus peel, herbs, minerals. Soft, rounded texture. Plush palate with a delicate edge. Shows off rich fruit elements surrounded by beautiful aromatics. A sensational, elegant drink.',
    SKU: 994573,
    unitsInStock: 1000,
    quantityPerUnit: 1,
    categoryId: 11
  },
  {
    name: `Hendrick's Gin`,
    price: 26.99,
    description:
      'Clear. Polished aromas of fresh citrus, herbal juniper, flower petal and cucumber follow through on bright, silky entry to a dry-yet-fruity medium-to-full body with violet, lavender, and pink peppercorn notes resonating brightly. Finishes with a delicate sweet citrus custard pastry, spice, potpourri, and mineral fade all in fine balance. A delightfully fruity, floral nouveau gin for artisan cocktails.',
    SKU: 994590,
    unitsInStock: 1000,
    quantityPerUnit: 1,
    categoryId: 10
  }
]

module.exports = {
  addresses,
  users,
  categories,
  images,
  products
}
