import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import basketSlice from "./basketSlice"
import productsSlice from "./productsSlice"

const store = configureStore({
  reducer: {
    product: productsSlice,
    basket: basketSlice,
    auth: authSlice,
  },
})

export default store
