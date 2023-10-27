import { createSlice } from "@reduxjs/toolkit"
import { IProduct } from "./model"

const initialProductsState: {
  product: IProduct
  loaded: boolean
} = {
  product: {
    id: "Id",
    code: "Code",
    title: "Title",
    image:
      "https://cdn.shopify.com/s/files/1/0610/6159/5188/files/AdobeStock_101945493_750x.jpg?v=1663607967",
    price: 5,
    description: "Description",
    inStock: "InStock",
    category: "Category",
    totalComments: 0,
    totalRate: 0,
    params: [
      {
        name: "fff",
        value: "fff",
      },
    ],
  },
  loaded: false,
}

const productSlice = createSlice({
  name: "Product",
  initialState: initialProductsState,
  reducers: {
    replaceProduct(state, actions) {
      // our data from fetch firebase

      // get fetch data from payload
      const data = actions.payload as IProduct

      state.product = data
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
