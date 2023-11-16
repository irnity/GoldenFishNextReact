import { createSlice } from '@reduxjs/toolkit'
import { type IBasketSliceProps, type IProduct } from './model'

const initialBasketState: IBasketSliceProps = {
  basket: [],
  totalPrice: 0,
  totalNumber: 0,
}

const basketSlice = createSlice({
  name: 'Basket',
  initialState: initialBasketState,
  reducers: {
    addToBasket(
      state,
      {
        payload: { description, title, image, price, code, inStock },
      }: {
        payload: IProduct
      }
    ) {
      const existedProductIndex = state.basket.findIndex(
        (product) => product.code === code
      )
      state.totalPrice += price
      state.totalNumber++

      if (existedProductIndex < 0) {
        const newProduct = {
          code,
          description,
          image,
          amountToBuy: 1,
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
          amountToBuy: existingProduct.amountToBuy++,
          totalPrice: existingProduct.totalPrice + price,
        }
        // change existed product
        state.basket[existedProductIndex] = updatedProduct
      }
    },
    clearBasket(state) {
      state.basket = []
      state.totalPrice = 0
      state.totalNumber = 0
    },
  },
})

export const basketActions = basketSlice.actions

export default basketSlice.reducer
