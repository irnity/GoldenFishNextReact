import { basketActions } from "@/redux/basketSlice"
import { IProduct } from "@/redux/model"
import { useDispatch } from "react-redux"

const useBasket = () => {
  const dispatch = useDispatch()

  const addProductToBasket = (product: IProduct) => {
    dispatch(basketActions.addToBasket(product))
  }

  return { addProductToBasket }
}

export default useBasket
