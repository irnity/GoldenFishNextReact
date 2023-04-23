// products
products = {
  products: [
    {
      id: "p1",
      title: "Фідерне вудлище Flagman Mantaray Pro Feeder 3.6м 100г",
      price: 5,
      description: "This is a first product - amazing!",
      inStock: 1,
    },
  ],
  totalAmountProduct: 0,
}

//
state.products.push({
  id: key,
  code: data[key].code || "code",
  title: data[key].title,
  image: data[key].image,
  price: data[key].price,
  description: data[key].description,
  isStock: data[key].inStock,
})

console.log(
  "key",
  typeof key,
  "code",
  typeof data[key].code,
  "title",
  typeof data[key].title,
  "image",
  typeof data[key].image,
  "price",
  typeof data[key].price,
  "description",
  typeof data[key].description,
  "inStock",
  typeof data[key].inStock
)
