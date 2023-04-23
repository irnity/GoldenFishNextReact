import { createSlice } from "@reduxjs/toolkit"
import { BasketSliceProps } from "./model"

const initialBasketState: BasketSliceProps = {
  basket: [],
  totalPrice: 0,
}

const basketSlice = createSlice({
  name: "Basket",
  initialState: initialBasketState,
  reducers: {
    addToBasket(
      state,
      {
        payload: { description, title, image, price, code, inStock },
      }: {
        payload: {
          description: string
          title: string
          image: string
          price: number
          code: string
          inStock: string
        }
      }
    ) {
      const existedProductIndex = state.basket.findIndex(
        (product) => product.code === code
      )
      state.totalPrice = state.totalPrice + price

      if (existedProductIndex < 0) {
        const newProduct = {
          code,
          description,
          image,
          amountToBuy: 1,
          piecePrice: price,
          totalPrice: price,
          title,
        }
        state.basket.push(newProduct)
      } else {
        // get existed product
        const existingProduct = state.basket[existedProductIndex]
        // change values in existed product
        const updatedProduct = {
          ...existingProduct,
          amountToBuy: existingProduct.amountToBuy + 1,
          totalPrice: existingProduct.totalPrice + existingProduct.piecePrice,
        }
        // change existed product
        state.basket[existedProductIndex] = updatedProduct
      }
    },
    clearBasket(state) {
      state.basket = []
      state.totalPrice = 0
    },

    createOrder(state) {
      async function post() {
        let url =
          "https://goldenfishreact-default-rtdb.europe-west1.firebasedatabase.app/order.json"

        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(state),
          headers: {
            "Content-Type": "application/json",
          },
        })
        if (!response.ok) {
          console.log("error")
        } else {
          console.log("data is posted")
        }
      }
      post()
    },
  },
})

export const basketActions = basketSlice.actions

export default basketSlice.reducer
