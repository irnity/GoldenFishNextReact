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
    addToBasket(state, actions) {
      const addedProduct: IProduct = actions.payload
      const existedProductIndex = state.basket.findIndex(
        (product) => product.code === addedProduct.code
      )

      state.totalPrice += addedProduct.price
      state.totalNumber++

      if (existedProductIndex < 0) {
        state.basket.push({
          ...addedProduct,
          amountToBuy: 1,
          totalPrice: addedProduct.price,
        })
      } else {
        const existingProduct = state.basket[existedProductIndex]
        const updatedProduct = {
          ...existingProduct,
          amountToBuy: existingProduct.amountToBuy + 1,
          totalPrice: existingProduct.totalPrice + addedProduct.price,
        }
        // change existed product
        state.basket[existedProductIndex] = updatedProduct
      }
    },
    lowerAmount(state, actions) {
      const code: string = actions.payload
      const existedProductIndex = state.basket.findIndex(
        (product) => product.code === code
      )
      state.totalPrice -= state.basket[existedProductIndex].price
      state.totalNumber--
      if (state.basket[existedProductIndex].amountToBuy === 1) {
        state.basket.splice(existedProductIndex, 1)
      } else {
        state.basket[existedProductIndex].amountToBuy--
        state.basket[existedProductIndex].totalPrice -=
          state.basket[existedProductIndex].price
      }
    },
    increaseAmount(state, actions) {
      const code: string = actions.payload
      const existedProductIndex = state.basket.findIndex(
        (product) => product.code === code
      )
      state.basket[existedProductIndex].amountToBuy++
      state.basket[existedProductIndex].totalPrice +=
        state.basket[existedProductIndex].price
      state.totalPrice += state.basket[existedProductIndex].price
      state.totalNumber++
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
