import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import basketSlice from "./basketSlice"
import productsSlice from "./productsSlice"
import warningSlice from "./warningSlice"

const store = configureStore({
  reducer: {
    product: productsSlice,
    basket: basketSlice,
    auth: authSlice,
    warning: warningSlice,
  },
})

export default store
