import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './productsSlice'
import basketSlice from './basketSlice'
import authSlice from './authSlice'
import warningSlice from './warningSlice'

const store = configureStore({
  reducer: {
    product: productsSlice,
    // basketReduxState
    basket: basketSlice,
    // userReduxState
    auth: authSlice,
    warning: warningSlice,
  },
})

export default store
