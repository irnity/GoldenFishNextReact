import { basketActions } from '@/Redux/basketSlice'
import { type IProduct } from '@/Redux/model'
import { useDispatch } from 'react-redux'

const useBasket = () => {
  const dispatch = useDispatch()

  const addProductToBasket = (product: IProduct) => {
    dispatch(basketActions.addToBasket(product))
  }

  return { addProductToBasket }
}

export default useBasket
