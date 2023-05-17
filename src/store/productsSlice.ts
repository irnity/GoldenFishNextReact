import { createSlice } from "@reduxjs/toolkit"
import { IProduct } from "./model"

const initialProductsState: {
  products: IProduct[]
  loaded: boolean
} = {
  products: [],
  loaded: false,
}

const productSlice = createSlice({
  name: "Products",
  initialState: initialProductsState,
  reducers: {
    replaceProducts(state, actions) {
      // our data from fetch firebase

      // check if data is loaded
      // delete data if we have one

      state.products = []
      // get fetch data from payload
      const data = actions.payload
      // console.log(data)

      state.products = data.map((product: IProduct) => ({
        id: product.id,
        code: product.code,
        title: product.title,
        image: product.image,
        price: product.price,
        description: product.description,
        isStock: product.inStock,
      }))
    },
    // should delete this
    addProduct(state) {
      state.loaded = false
    },
    // should delete this
    removeProduct(state) {
      state.loaded = false
    },
  },
})

export const productsActions = productSlice.actions

export default productSlice.reducer
