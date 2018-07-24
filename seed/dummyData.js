const addresses = [
    {
      street1: "12345 N Street Road",
      street2: "Apt 4065",
      city: "Chicago",
      state: "Illinois",
      zip: "60614",
      country: "United States"
    },
    {
      street1: "816 W State St",
      city: "Oklahoma City",
      state: "Oklahoma",
      zip: "73170",
      country: "United States"
    },
    {
      street1: "3120 SW 126th Ave.",
      city: "Cost Mesa",
      state: "California",
      zip: "90228",
      country: "United States"
    },
    {
      street1: "909 N 42nd St",
      street2: "Unit 5",
      city: "New York City",
      state: "New York",
      zip: "10294",
      country: "United States"
    }
  ]
  
  const users = [
    {
      firstName: "Courtney",
      lastName: "Collison",
      email: "courtney@example.com",
      phone: "5559214829",
      addressId: 2,
      isAdmin: true
    },
    {
      firstName: "Andy",
      lastName: "Anderson",
      email: "andy@example.com",
      phone: "5554207654",
      addressId: 4,
      isAdmin: true
    },
    {
      firstName: "Eric",
      lastName: "Erickson",
      email: "eric@example.com",
      phone: "5552180920",
      addressId: 1,
      isAdmin: false
    },
    {
      firstName: "Stephanie",
      lastName: "Stephenson",
      email: "stephanie@example.com",
      phone: "5556336719",
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
      parentId: null,
      imageUrl: 'http://placehold.it/800x400'
    },
    {
      name: 'Wine',
      parentId: null,
      imageUrl: 'http://placehold.it/800x400'
    },
    {
      name: 'IPA',
      parentId: 1,
      imageUrl: 'http://placehold.it/800x400'
    },
    {
      name: 'Cabernet Sauvignon',
      parentId: 2,
      imageUrl: 'http://placehold.it/800x400'
    }
  ]

module.exports = {
    addresses,
    users,
    categories,
    images
}



