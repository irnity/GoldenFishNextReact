export interface IProduct {
  id: string
  code: string
  title: string
  image: string
  price: number
  description: string
  inStock: string
}

export interface IBasketSliceProps {
  basket: {
    code: string
    description: string
    image: string
    amountToBuy: number
    totalPrice: number
    title: string
  }[]
  totalPrice: number
  totalNumber: number
}
