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
    lastName: 'Anderson',
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
    firstName: 'Sara',
    lastName: 'Sorenson',
    email: 'sara@example.com',
    password: 'abc123',
    phone: '5556336719',
    addressId: 3,
    isAdmin: false
  },
  {
    firstName: 'Blake',
    lastName: 'Black',
    email: 'blake@example.com',
    password: 'abc123',
    phone: '5559081127',
    addressId: 1,
    isAdmin: false
  },
  {
    firstName: 'Mary',
    lastName: 'Meyers',
    email: 'mary@example.com',
    password: 'abc123',
    phone: '5558828346',
    addressId: 4,
    isAdmin: true
  },
  {
    firstName: 'Jerry',
    lastName: 'Jones',
    email: 'jerry@example.com',
    password: 'abc123',
    phone: '5554109921',
    addressId: 2,
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

const beerCategories = [
  { name: 'Lager' },
  { name: 'IPA' },
  { name: 'Cider' },
  { name: 'Stout' },
  { name: 'Pale Ale' },
  { name: 'Wheat Ale' },
  { name: 'Pilsner' },
  { name: 'Kölsch' }
]

const wineCategories = [
  { name: 'Red Wine' },
      { name: 'Pinot Noir', parent: 'Red Wine' },
      { name: 'Malbec', parent: 'Red Wine' },
      { name: 'Merlot', parent: 'Red Wine' },
      { name: 'Cabernet Sauvignon', parent: 'Red Wine' },
      { name: "Nero D'Avola", parent: 'Red Wine' },
  { name: 'White Wine' },
      { name: 'Chardonnay', parent: 'White Wine' },
      { name: 'Sauvignon Blanc', parent: 'White Wine' },
      { name: 'Riesling', parent: 'White Wine' },
      { name: 'Pinot Grigio', parent: 'White Wine' },
  { name: 'Rosé Wine' },
      { name: 'White Zinfandel', parent: 'Rosé Wine' }
]

const liquorCategories = [
  { name: 'Whiskey' },
      { name: 'Bourbon', parent: 'Whiskey' },
      { name: 'Scotch', parent: 'Whiskey' },
      { name: 'Rye', parent: 'Whiskey' },
  { name: 'Vodka' },
      { name: 'Flavored Vodka', parent: 'Vodka' },
  { name: 'Rum' },
      { name: 'White Rum', parent: 'Rum' },
      { name: 'Spiced Rum', parent: 'Rum' },
      { name: 'Gold Rum', parent: 'Rum' },
  { name: 'Gin' },
      { name: 'London Dry', parent: 'Gin' },
      { name: 'Aged Gin', parent: 'Gin' },
  { name: 'Tequila' },
      { name: 'Silver', parent: 'Tequila' },
      { name: 'Añejo', parent: 'Tequila' },
      { name: 'Resposado', parent: 'Tequila' },
]

const products = [
  /**
   * BEERS
   */

   // LAGER
  {
    name: 'Yuengling',
    description:
      `Yuengling Lager is an iconic American lager famous for its rich amber color and medium-bodied flavor. Roasted caramel malt adds subtle sweetness, while a combination of cluster and cascade hops round out this well-balanced beer. Drink this classic lager chilled, either in a beer mug or straight from the bottle.`,
    imageUrl: 'https://products0.imgix.drizly.com/ci-yuengling-lager-6f82d7ee4e6dba1a.png',
    price: 11.99,
    SKU: 'BLY00372',
    unitsInStock: 200,
    categories: ['Beer', 'Lager']
  },
  {
    name: 'Modelo Especial',
    description:
      `Well-balanced taste and light hop character with a crisp, clean finish. Modelo Especial is characterized by an orange blossom honey aroma with a hint of herb.`,
    imageUrl: 'https://products1.imgix.drizly.com/ci-modelo-especial-b5d90deeb5fd3e46.png',
    price: 9.99,
    SKU: 'BLM94781',
    unitsInStock: 50,
    categories: ['Beer', 'Lager']
  },
  {
    name: 'Brooklyn Lager',
    description:
      `Brooklyn Lager is amber gold in color and displays a firm malt center supported by a refreshing bitterness and floral hop aroma. Caramel malts show in the finish. The aromatic qualities of the beer are enhanced by dry hopping, the centuries old practice of steeping the beer with fresh hops as it undergoes a long, cold maturation. The result is a wonderfully flavorful beer, smooth, refreshing and very versatile with food.`,
    imageUrl: 'https://products2.imgix.drizly.com/ci-brooklyn-lager-ac1795949fec1a3a.png',
    price: 12.49,
    SKU: 'BLB63819',
    unitsInStock: 4,
    categories: ['Beer', 'Lager']
  },
  {
    name: 'Shiner Bock',
    description:
      `Once considered a Lenten beer and only made in the weeks leading up to Easter, Shiner Bock is now the flagship beer for Spoetzel Brewery and is produced year-round. Spoetzel Brewery is one of the oldest independent breweries in the U.S. and is well known for their craft beer offerings. German and Czech immigrants who craved the brews of their motherlands founded the brewery in 1909 and kept it running through Prohibition by selling ice and “near beer.” Brewed since 1913, Shiner Bock is an amber ale that pours clear orange with a small amount of head. Malt dominates the aroma and flavor, with hints of toffee and caramel.`,
    imageUrl: 'https://products1.imgix.drizly.com/ci-shiner-bock-fa11c6a869b7e220.png',
    price: 11.98,
    SKU: 'BLS74882',
    unitsInStock: 1,
    categories: ['Beer', 'Lager']
  },
  {
    name: 'Coors Banquet',
    description:
      `Legend has it that in the late 1800s, thirsty miners threw celebratory banquets, with Coors as the honorary beer because of its superior craftsmanship. Prior to its nationwide distribution, Coors Banquet beer built a cult following, with presidents, movie stars and consumers toting the beer back from Colorado or making special trips to buy the uniquely crisp and drinkable beer.`,
    imageUrl: 'https://products2.imgix.drizly.com/ci-coors-banquet-2377c317e74b4b3c.jpeg',
    price: 7.50,
    SKU: 'BLC73332',
    unitsInStock: 2,
    categories: ['Beer', 'Lager']
  },

  // IPA
  {
    name: `Lord Hobo Boom Sauce`,
    description:
      `Our flagship IPA features six hop varietals and a blend of spelt, oat and wheat. A late hop addition of Mosaic, Falconer's Flight and Amarillo delivers a notable citrus and tropical fruit finish.`,
    imageUrl: 'https://products0.imgix.drizly.com/ci-lord-hobo-boom-sauce-ipa-77460e42cdec8946.png',
    price: 13.49,
    SKU: 'BIB77101',
    unitsInStock: 5,
    categories: ['Beer', 'IPA']
  },
  {
    name: 'Goose Island IPA',
    description:
      `Goose Island's India Pale Ale recalls a time when ales shipped from England to India were highly hopped to preserve their distinct taste during the long journey. The result is a hop lover's dream with an IPA boasting a fruity aroma, set off by a dry malt middle, and long hop finish. Goose Island IPA pairs well with blue cheese or aged gouda.`,
    imageUrl: 'https://products3.imgix.drizly.com/ci-goose-island-ipa-158e904177a3d9f0.jpeg',
    price: 10.99,
    SKU: 'BIG53641',
    unitsInStock: 4,
    categories: ['Beer', 'IPA']
  },
  {
    name: `Sierra Nevada Hazy Little Thing`,
    description:
      `As brewers, we get the privilege to sample our beers straight from the tanks in all their raw glory. Some beers need a little polishing to get ready to go out into the world, while others—the hop-heavy, rowdy, crowd-pleasers—should just be left alone. We wanted to share this brewery-only treat with you, so we present this Hazy Little Thing, our unfiltered, unprocessed IPA, straight from the tanks and into the can.`,
    imageUrl: 'https://products1.imgix.drizly.com/ci-sierra-nevada-hazy-ipa-9dad589f37cd1dae.png',
    price: 12.99,
    SKU: 'BIS84713',
    unitsInStock: 0,
    categories: ['Beer', 'IPA']
  },

  // CIDER
  {
    name: 'Stella Artois Cidre',
    description:
      `Naturally gluten-free, Stella Artois Cidre is the perfect partner for your alfresco gatherings and a great excuse to bring friends together for an unforgettable summer experience. This European-style cider is well-balanced, and pairs a soft, fruity sweetness with a crisp dryness, making it the perfect go-to summer drink. Pairs well with pork chops, soft cheeses, or roasted vegetables.`,
    imageUrl: 'https://products0.imgix.drizly.com/ci-stella-artois-cidre-cb57a4f38d5f4c3b.jpeg',
    price: 9.99,
    SKU: 'BCS49012',
    unitsInStock: 21,
    categories: ['Beer', 'Cider']
  },
  {
    name: 'Angry Orchard Cider Variety Pack',
    description:
      `The Angry Orchard variety pack is perfect for when you just cant decide. It features 3 bottles each of Crisp Apple, Apple Ginger, Traditional Dry and a rotating seasonal style.`,
    imageUrl: 'https://products1.imgix.drizly.com/ci-angry-orchard-cider-variety-pack-f66b11154133b3ff.jpeg',
    price: 21.99,
    SKU: 'BCA26784',
    unitsInStock: 10,
    categories: ['Beer', 'Cider']
  },
  {
    name: `Smith & Forge Hard Cider`,
    description:
      `Hard cider is a strong, sturdy but not-too-sweet fermented alcoholic beverage built from the juice of apples. It's not actually hard, as that would be impossible to drink.`,
    imageUrl: 'https://products2.imgix.drizly.com/ci-smith-forge-hard-cider-051fa3bbac40818d.png',
    price: 13.25,
    SKU: 'BCS29017',
    unitsInStock: 3,
    categories: ['Beer', 'Cider']
  },

  // STOUT
  {
    name: 'Left Hand Milk Stout Nitro',
    description:
      `Dark and delicious, Americas great milk stout will change your perception about what a stout can be. Pouring hard out of the bottle, Left Hand Milk Stout Nitro cascades beautifully, building a tight, thick head like hard whipped cream. The aroma is of brown sugar and vanilla cream, with hints of roasted coffee. The pillowy head coats your upper lip and its creaminess entices your palate. Initial roasty, mocha flavors rise up, with slight hop and roast bitterness in the finish. The rest is pure bliss of milk chocolate fullness.`,
    imageUrl: 'https://products3.imgix.drizly.com/ci-left-hand-milk-stout-nitro-1cc9bd255865b63b.png',
    price: 7.49,
    SKU: 'BSL35450',
    unitsInStock: 4,
    categories: ['Beer', 'Stout']
  },
  {
    name: 'Oskar Blues Barrel Aged Ten Fidy',
    description:
      `This titanic, immensely viscous stout is loaded with inimitable flavors of chocolate-covered caramel and coffee and hide a hefty 98 IBUs underneath the smooth blanket of malt. Ten FIDY (10.5% ABV) is made with enormous amounts of two-row malt, chocolate malt, roasted barley, flaked oats and hops. Ten FIDY is the ultimate celebration of dark malts and boundary-stretching beer.`,
    imageUrl: 'https://products3.imgix.drizly.com/ci-oskar-blues-ten-fidy-cc421b11774a93f3.jpeg',
    price: 12.99,
    SKU: 'BSO47856',
    unitsInStock: 1,
    categories: ['Beer', 'Stout']
  },
  {
    name: 'Kentucky Bourbon Barrel Stout',
    description:
      `Kentucky Bourbon Barrel Stout is brewed and aged with Alltech Café Citadelle Haitian coffee and aged in world-famous Kentucky bourbon barrels. The result is a complex stout with dark-roasted malts, hints of caramel and vanilla and a lightly roasted coffee finish.`,
    imageUrl: 'https://products0.imgix.drizly.com/ci-alltech-kentucky-bourbon-barrel-stout-818950e104cbeeca.jpeg',
    price: 11.95,
    SKU: 'BSK45619',
    unitsInStock: 0,
    categories: ['Beer', 'Stout']
  },
  {
    name: 'Ninkasi Vanilla Otis',
    description: '',
    imageUrl: 'https://products2.imgix.drizly.com/ci-ninkasi-vanilla-otis-c03622791dca2019.jpeg',
    price: 15.49,
    SKU: 'BSN75011',
    unitsInStock: 2,
    categories: ['Beer', 'Stout']
  },

  // Pale Ale
  {
    name: 'Half Acre Daisy Cutter Pale Ale',
    description:
      `Half Acre Daisy Cutter Pale Ale  Daisy Cutter Pale Ale - A west coast Pale Ale chock-full of dank, aromatic hops. This one's a screamer, hoard it. 5.2% ABV.`,
    imageUrl: 'https://products3.imgix.drizly.com/ci-half-acre-daisy-cutter-pale-ale-a18fd73043b2c60c.jpeg',
    price: 11.95,
    SKU: 'BPH40118',
    unitsInStock: 5,
    categories: ['Beer', 'Pale Ale']
  },
  {
    name: 'Bass',
    description:
      `Bass Pale Ale is a classic English-style pale ale. Beautiful chestnut coloring with aromas or nuts, caramel, dried fruits and raisins. The taste is slightly sweet and a trace drying, with a nice balanced English hop finish.`,
    imageUrl: 'https://products0.imgix.drizly.com/ci-bass-pale-ale-bbe7b6586767d0e1.jpeg',
    price: 13.49,
    SKU: 'BPB55843',
    unitsInStock: 20,
    categories: ['Beer', 'Pale Ale']
  },
  {
    name: `Oskar Blues Dale's Pale Ale`,
    description:
      `Brewed with hefty amounts of European malts and four kinds of American hops, Dale's Pale Ale delivers a blast of hop aromas redolent of citrus and spice, which are then complemented by toasty and sweet malts. This brew has a silky mouthfeel with an accompanying lingering bitterness.`,
    imageUrl: 'https://products0.imgix.drizly.com/ci-oskar-blues-dales-pale-ale-e4b17bc3cab9d60d.jpeg',
    price: 11.99,
    SKU: 'BPO77509',
    unitsInStock: 0,
    categories: ['Beer', 'Pale Ale']
  },

  // Wheat Ale
  {
    name: 'Harpoon UFO White',
    description:
      `Light, crisp, refreshing UFO White follows in the tradition of spiced wheat beers that have been brewed in Belgium for well over 300 years. Brewed with orange peel and coriander, UFO White is the perfect choice for a summer’s barbecue, a night out with friends or any time you're thirsting for something a little different.`,
    imageUrl: 'https://products0.imgix.drizly.com/ci-harpoon-ufo-white-48c4f1b4799fa135.png',
    price: 10.14,
    SKU: 'BWH39811',
    unitsInStock: 2,
    categories: ['Beer', 'Wheat Ale']
  },
  {
    name: 'Goose Island 312 Urban Wheat Ale',
    description:
      `Inspired by the city of Chicago and densely populated with flavor, 312's spicy aroma of Cascade hops is followed by a crisp, fruity ale flavor delivered in a smooth, creamy body.`,
    imageUrl: 'https://products3.imgix.drizly.com/ci-goose-island-312-urban-wheat-ale-2f229e488ee6dbcd.jpeg',
    price: 7.99,
    SKU: 'BWG61092',
    unitsInStock: 100,
    categories: ['Beer', 'Wheat Ale']
  },

  // Pilsner
  {
    name: 'Old Style Beer',
    description:
      `Old Style is a beer that revives the crisp rich freshness of a classic Pilsner: light in color and body, medium in aroma and bitterness, full flavored with a delicate aftertaste.`,
    imageUrl: 'https://products2.imgix.drizly.com/ci-old-style-beer-27067f39db712e6a.png',
    price: 5.99,
    SKU: 'BPO00011',
    unitsInStock: 45,
    categories: ['Beer', 'Pilsner']
  },
  {
    name: 'North Coast Scrimshaw',
    description:
      `Named for the delicate engravings popularized by 19th century seafarers, Scrimshaw is a fresh tasting Pilsner brewed in the finest European tradition from Munich and Klages malts, Hallertauer and Tettnang hops. Scrimshaw has a subtle hop character, a crisp, clean palate, and a dry finish.`,
    imageUrl: 'https://products1.imgix.drizly.com/ci-north-coast-scrimshaw-89912e7a47bfefc3.jpeg',
    price: 12.49,
    SKU: 'BPN30107',
    unitsInStock: 2,
    categories: ['Beer', 'Pilsner']
  },
  {
    name: 'Cisco Summer of Lager',
    description:
      `The lager is the lightest, most refreshing of our beers. It's a classic Bavarian style lager with a delicious bready malt palate and an assertive noble hop finish. It just makes your mouth beg for more.`,
    imageUrl: 'https://products1.imgix.drizly.com/ci-cisco-summer-of-lager-7604002e3434057f.jpeg',
    price: 12.50,
    SKU: 'BPC48003',
    unitsInStock: 0,
    categories: ['Beer', 'Pilsner']
  },
  {
    name: 'Peak Organic Fresh Cut',
    description:
      `Fresh Cut is a dry-hopped pilsner. Chinook, Citra and Centennial hops provide aromas of citrus, grass and spice. Though the front palate is loud with IPA qualities, the finish is distinctly pilsner — crisp, dry and extremely refreshing.`,
    imageUrl: 'https://products0.imgix.drizly.com/ci-peak-organic-fresh-cut-3ce86ba58e4e0cd8.png',
    price: 9.99,
    SKU: 'BPP77490',
    unitsInStock: 1,
    categories: ['Beer', 'Pilsner']
  },
  {
    name: 'Bitburger Premium Pils',
    description:
      `The classic Bitburger — a mature and most agreeable beer — is brewed with the best of ingredients in the same traditional way it has been for many, many years. The result is delicately tart and pleasantly bitter - with a strong hop taste.`,
    imageUrl: 'https://products3.imgix.drizly.com/ci-bitburger-premium-pils-395245e926bb1a6c.jpeg',
    price: 11.49,
    SKU: 'BPB12974',
    unitsInStock: 3,
    categories: ['Beer', 'Pilsner']
  },




  /**
   * WINE
   */

  // RED - Cabernet Sauvignon
  {
    name: 'Duckhorn Cabernet Sauvignon',
    description:
      `Duckhorn Vineyards has been producing Cabernet Sauvignon since 1978. This wine is a blend of individual vineyard lots, utilizing exceptional fruit from Duckhorn’s estate vineyards and independent growers. The final wine is a classic expression of the Napa Valley. Complex and compelling, Duckhorn Cabernet reflects the diversity of great Napa Valley Cabernet Sauvignon.`,
    imageUrl: 'https://products1.imgix.drizly.com/ci-duckhorn-cabernet-sauvignon-cf06a1c9392ef170.jpeg',
    price: 28.49,
    SKU: 'WRC58397',
    unitsInStock: 20,
    categories: ['Wine', 'Red Wine', 'Cabernet Sauvignon']
  },

  // RED - Pinot Noir
  {
    name: 'Hahn Pinot Noir',
    description:
      `The Hahn Winery Pinot Noir shows red fruit flavors, a pretty lively palate and a lasting finish; a good choice with lightly grilled meats.`,
    imageUrl: 'https://products3.imgix.drizly.com/ci-hahn-pinot-noir-9ffaa3d8e801067c.jpeg',
    price: 10.98,
    SKU: 'WRP88514',
    unitsInStock: 0,
    categories: ['Wine', 'Red Wine', 'Pinot Noir']
  },

  // RED - Merlot

  // RED - Malbec

  // RED - Nero D'Avola
  {
    name: `Caruso & Minini Nero D'Avola`,
    description:
      `This wine shows off a wonderful color in tone with an elegance that it possesses. To one's palate it is slightly spicy with strong and creamy tannins. A series of sensations that only a wine with a high enological profile can offer.`,
    imageUrl: 'https://products1.imgix.drizly.com/ci-caruso-minini-nero-davola-c39bef26802965b9.png',
    price: 19.98,
    SKU: 'WRN21996',
    unitsInStock: 1,
    categories: ['Wine', 'Red Wine', `Nero D'Avola`]
  },

  // WHITE - Chardonnay
  {
    name: `Wente Riva Ranch Chardonnay`,
    description:
      `Our Riva Ranch Chardonnay is a beautifully rich, yet balanced style of Chardonnay that represents what the Arroyo Seco appellation has to give. Deep, rich soils allow for vines with deep roots, which help to deliver rich fruit flavors. In addition to the classic Chardonnay aromas of apple and pear, Arroyo Seco consistently delivers aromas of tropical fruits and stone fruits. This is distinctly a California style of Chardonnay, but is consistently well balanced with ample acidity.`,
    imageUrl: 'https://products2.imgix.drizly.com/ci-wente-riva-ranch-chardonnay-2d233ea9c57607ed.jpeg',
    price: 10.99,
    SKU: 'WWW42350',
    unitsInStock: 2,
    categories: ['Wine', 'White Wine', `Chardonnay`]
  },
  {
    name: `Francis Coppola Diamond Collection Canned Chardonnay`,
    description:
      `Our Diamond Collection Chardonnay exhibits a silky texture, a full mid palate, and bright purity of flavors, which add to the lasting, complex finish.`,
    imageUrl: 'https://products2.imgix.drizly.com/ci-coppola-diamond-collection-canned-chardonnay-91a6ab871ca24e3e.jpeg',
    price: 9.49,
    SKU: 'WWF23399',
    unitsInStock: 5,
    categories: ['Wine', 'White Wine', `Chardonnay`]
  },

  // WHITE - Sauvignon Blanc
  {
    name: `Joel Gott Sauvignon Blanc`,
    description:
      `The 2013 Joel Gott California Sauvignon Blanc has bright citrus aromas complemented by tropical notes. Refreshing flavors of melon lead to juicy Meyer lemon zest flavors on the mid palate, and a long, clean, and balanced finish.`,
    imageUrl: 'https://products0.imgix.drizly.com/ci-joel-gott-sauvignon-blanc-8d9592efe89d0c98.png',
    price: 9.89,
    SKU: 'WWJ89524',
    unitsInStock: 0,
    categories: ['Wine', 'White Wine', `Sauvignon Blanc`]
  },
  {
    name: `Cloudy Bay Sauvignon Blanc`,
    description:
      `The Marlborough region is blessed with a unique terroir... a cool, South Pacific climate that produces wines of great fruit intensity. Cloudy Bay Sauvignon Blanc is a benchmark wine that epitomizes the vibrant aromatics and pure fruit flavours naturally afforded by the climate and soils of this remote southern wine region.`,
    imageUrl: 'https://products3.imgix.drizly.com/ci-cloudy-bay-sauvignon-blanc-d808d4a7838e06c5.jpeg',
    price: 27.99,
    SKU: 'WWC44345',
    unitsInStock: 2,
    categories: ['Wine', 'White Wine', `Sauvignon Blanc`]
  },

  // WHITE - Pinot Grigio

  // WHITE - Riesling

  // ROSE
  {
    name: `Miraval Provence Rosé`,
    description:
      `A beautiful light pink colour, fresh fruit aromas and refreshing acidity. Miraval’s pure expression of the terroir of Côtes de Provence.`,
    imageUrl: 'https://products1.imgix.drizly.com/ci-miraval-provence-rose-3e3fa1da4bdcc5bc.jpeg',
    price: 18.49,
    SKU: 'WRM665031',
    unitsInStock: 1,
    categories: ['Wine', `Rosé Wine`]
  },
  {
    name: `Underwood Rosé`,
    description:
      `Drinkable, unpretentious and travel-ready, this is the perfect wine for action lounging, such as poolside shindigs, outdoor music festivals, backyard BBQ's with friends or anywhere that calls for serious lounging. It's set to become your favorite spring and summer staple.`,
    imageUrl: 'https://products1.imgix.drizly.com/ci-underwood-rose-b457deb810493111.jpeg',
    price: 8.99,
    SKU: 'WRU87322',
    unitsInStock: 4,
    categories: ['Wine', `Rosé Wine`]
  },

  // ROSE - White Zinfandel
  {
    name: `Sutter Home White Zinfandel`,
    description:
      `You may blush with excitement over this fresh, lively wine. Beauty in a bottle, our light, refreshing White Zinfandel wine flirts with your tongue, as you taste essences of strawberry and melon. Perfect with all types of food, we recommend pairing it with something a little spicy such as Asian or Latin cuisine.`,
    imageUrl: 'https://products3.imgix.drizly.com/ci-sutter-home-white-zinfandel-6c114f5ee1cb4f93.jpeg',
    price: 4.29,
    SKU: 'WRW28452',
    unitsInStock: 20,
    categories: ['Wine', `Rosé Wine`, `White Zinfandel`]
  },




  /**
   * LIQUOR
   */

  // Vodka
  {
    name: `Tito's Handmade Vodka`,
    description:
      `Tito's Handmade Vodka is designed to be savored by spirit connoisseurs.  It is micro-distilled in an old-fashioned pot still, just like fine single malt scotches and high-end French cognacs.  This time-honored method of distillation requires more skill and effort than modern column stills, but it's well worth it.`,
    imageUrl: 'https://products1.imgix.drizly.com/ci-titos-handmade-vodka-864dff1cac26796a.jpeg',
    price: 21.49,
    SKU: 'LVT24099',
    unitsInStock: 5,
    categories: ['Liquor', `Vodka`]
  },
  {
    name: `Stoli Vodka`,
    description:
      `One of the worlds true Vodka icons, Stoli Vodka is pure spirit distilled from selected grain is filtered through birch charcoal and quartz sands and blended with pure water.`,
    imageUrl: 'https://products0.imgix.drizly.com/ci-stolichnaya-vodka-beb9736ba99f0e56.jpeg',
    price: 13.44,
    SKU: 'LVS77583',
    unitsInStock: 15,
    categories: ['Liquor', `Vodka`]
  },

  // Vodka - Flavored Vodka
  {
    name: `CIROC Coconut Vodka`,
    description:
      `A vodka with a creamy and sweet coconut flavor with a faint hint of tropical fruit.`,
    imageUrl: 'https://products0.imgix.drizly.com/ci-ciroc-coconut-vodka-2365bddaebe2501f.jpeg',
    price: 23.14,
    SKU: 'LVF23499',
    unitsInStock: 1,
    categories: ['Liquor', 'Vodka', `Flavored Vodka`]
  },

  // Whiskey - Bourbon
  {
    name: `Basil Hayden's Kentucky Straight Bourbon Whiskey`,
    description:
      `Marked by a rich cascade of aromas and flavors, Basil Hayden's® Kentucky Straight Bourbon Whiskey is carefully matured for exceptional quality and distilled in the heart of bourbon country in Clermont, Kentucky. This unique, single small batch bourbon whiskey is blessed with rich hints of peppermint, notes of pepper, slight citrus overtones and a spicy, warming finish.`,
    imageUrl: 'https://products1.imgix.drizly.com/ci-basil-haydens-kentucky-straight-bourbon-whiskey-720c87a2f6fa8cfb.jpeg',
    price: 41.99,
    SKU: 'LWB77592',
    unitsInStock: 3,
    categories: ['Liquor', 'Whiskey', `Bourbon`]
  },

  // Whiskey - Scotch
  {
    name: `Johnnie Walker Blue Label`,
    description:
      `Blue Label is incredibly smoky and rich with a velvety smoothness that complements its powerful flavor. Hints of honey, hazelnuts, oranges and sherry hit the senses first, giving way to kumquats, ginger, dark chocolate and sandalwood. Just before the long finish, hints of dried fruit and pepper emerge, leading the drinker to a lingering, perfectly balanced and smoky culmination.`,
    imageUrl: 'https://products0.imgix.drizly.com/ci-johnnie-walker-blue-label-3893b97070fead35.png',
    price: 189.99,
    SKU: 'LWS55120',
    unitsInStock: 2,
    categories: ['Liquor', 'Whiskey', `Scotch`]
  },

  // Whiskey - Rye

  // Rum - Spiced Rum

  // Rum - White Rum

  // Rum - Gold Rum
  {
    name: `Bumbu Original Rum`,
    description:
      `Our flagship Bumbu Rum is based on the original recipe created by 16th and 17th century sailors of the West Indies, who blended native Caribbean ingredients into their rum and called it “Bumbu” – truly the original craft spirit.  Using the same all-natural native spices and no artificial colors or flavors, our rum is an authentic revival of this piece of Caribbean history, distilled in small batches and blended by hand.`,
    imageUrl: 'https://products0.imgix.drizly.com/ci-bumbu-original-rum-cb6bd438aa5e66ca.jpeg',
    price: 35.49,
    SKU: 'LRG94911',
    unitsInStock: 2,
    categories: ['Liquor', 'Rum', `Gold Rum`]
  },
  {
    name: `Tanduay Gold Rum`,
    description:
      `Expressive flavors of vanilla, tropical fruit, and notes of clean, new oak.`,
    imageUrl: 'https://products0.imgix.drizly.com/ci-tanduay-gold-rum-f5eb815611413dc4.png',
    price: 18.99,
    SKU: 'LRG83229',
    unitsInStock: 2,
    categories: ['Liquor', 'Rum', `Gold Rum`]
  },

  // Rum - Flavored Rum

  // Gin - London Dry
  {
    name: `St. George Terrior Gin`,
    description:
      `An ode to the wild beauty of the Golden State. Forest-driven and earthy, Terroir is a profoundly aromatic gin with a real sense of place.it is a spirit that conveyed the love about the monumental groves of trees, moist and misty glens, and sun-baked chaparral of your favorite local parklands.`,
    imageUrl: 'https://products3.imgix.drizly.com/ci-st-george-terrior-gin-0165f6ce22ec3485.jpeg',
    price: 29.98,
    SKU: 'LGL77413',
    unitsInStock: 5,
    categories: ['Liquor', 'Gin', `London Dry`]
  },

  // Gin - Aged Gin

  // Tequila - Silver / Blanco

  // Tequila - Añejo
  {
    name: `Adictivo Tequila Extra Añejo`,
    description:
      `Addictive Extra Añejo is a 100% Pure Blue Agave Tequila, dark amber colored with reddish hues, with an excellent roasted flavor, and sweet fruity aromas.`,
    imageUrl: 'https://products2.imgix.drizly.com/ci-adictivo-tequila-extra-anejo-9c687e604b8ecf00.png',
    price: 109.99,
    SKU: 'LTA875937',
    unitsInStock: 1,
    categories: ['Liquor', 'Tequila', `Añejo`]
  },
  {
    name: `Don Julio 1942`,
    description:
      `Aged for 2.5 years in small batches, Don Julio 1942 is handcrafted in tribute to the year that Julio González's founded his distillery "La Primavera." This luxury tequila has a taste of warm oak with hints of caramel and toffee. Made with 100% blue agave plant. Sip neat or chilled.`,
    imageUrl: 'https://products1.imgix.drizly.com/ci-don-julio-1942-9a779b176d8bdcd7.jpeg',
    price: 134.98,
    SKU: 'LTA13995',
    unitsInStock: 2,
    categories: ['Liquor', 'Tequila', `Añejo`]
  },

  // Tequila - Resposado




  // {
  //   name: ``,
  //   description:
  //     ``,
  //   imageUrl: '',
  //   price: 0,
  //   SKU: '',
  //   unitsInStock: 0,
  //   categories: []
  // },
]

const reviews = [
  {
    subject: `It SUCKED`,
    content: `Kinda lame. Sorta hated drinking it`,
    rating: 1,
    userId: 1,
    product: [`Lord Hobo Boom Sauce`]
  },
  {
    subject: `Mehhhhh`,
    content: `Ok i guess.`,
    rating: 3,
    userId: 2,
    product: [`Modelo Especial`]
  },
  {
    subject: `Bow Chicka Wow`,
    content: `Amazing! I will tell my friends about this beer.`,
    rating: 5,
    userId: 1,
    product: [`Yuengling`]
  },
  {
    subject: ``,
    content: `Generic product review...`,
    rating: 3,
    userId: 1,
    product: [`Cloudy Bay Sauvignon Blanc`]
  },
  {
    subject: `Lovely flavor!`,
    content: ``,
    rating: 5,
    userId: 3,
    product: [`Caruso & Minini Nero D'Avola`]
  },
  {
    subject: `Not sweet enough`,
    content: `I wish this were sweeter`,
    rating: 2,
    userId: 2,
    product: [`CIROC Coconut Vodka`]
  },
  {
    subject: `Can't get enough!`,
    content: `The BEST vodka in the world!!!!!!`,
    rating: 5,
    userId: 1,
    product: [`Tito's Handmade Vodka`]
  },
  {
    subject: `NEVER GOT MY ORDER`,
    content: `This website is a scam, man. DON'T TRUST IT!!!`,
    rating: 1,
    userId: 4,
    product: [`Don Julio 1942`]
  },
  {
    subject: ``,
    content: ``,
    rating: 5,
    userId: 2,
    product: [`Tito's Handmade Vodka`]
  },
  {
    subject: `Love it`,
    content: `Great stuff`,
    rating: 5,
    userId: 1,
    product: [`Kentucky Bourbon Barrel Stout`]
  },
  {
    subject: ``,
    content: `Not bad for a pale ale`,
    rating: 4,
    userId: 3,
    product: [`Half Acre Daisy Cutter Pale Ale`]
  },
  {
    subject: `gross`,
    content: `it's gross`,
    rating: 1,
    userId: 2,
    product: [`Bumbu Original Rum`]
  },
  {
    subject: ``,
    content: `Delicious but overpriced. Buy it at your local store and you'll get it $20 cheaper I guarantee you`,
    rating: 4,
    userId: 3,
    product: [`Adictivo Tequila Extra Añejo`]
  },
  {
    subject: `It'll do the job`,
    content: `Nothing fancy here.`,
    rating: 3,
    userId: 1,
    product: [`Coors Banquet`]
  },
  {
    subject: `definitely will order again!!`,
    content: ``,
    rating: 4,
    userId: 2,
    product: [`Left Hand Milk Stout Nitro`]
  },






  // {
  //   subject: ``,
  //   content: ``,
  //   rating: 0,
  //   userId: 3,
  //   product: [``]
  // },
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

// const orders = [
//   {
//     email: 'jjj@gmail.com',
//     phoneNumber: '555-900-3455',
//     addressId: 1,
//     orderStatusCodeId: 1,
//     products: [6, 5]
//   },
//   {
//     email: 'www@gmail.com',
//     phoneNumber: '777-220-6791',
//     addressId: 4,
//     orderStatusCodeId: 1,
//     products: [1]
//   },
//   {
//     orderStatusCodeId: 1,
//     products: [2, 3, 5],
//     customerId: 1
//   },
//   {
//     orderStatusCodeId: 1,
//     products: [4, 1],
//     customerId: 2
//   }
// ]

module.exports = {
  orderStatusCodes,
  // orders,
  addresses,
  users,
  beerCategories,
  wineCategories,
  liquorCategories,
  images,
  products,
  reviews
}
