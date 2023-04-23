export interface ProductSliceProps {
  products: {
    id: string
    code: string | undefined
    title: string
    image: string
    price: number | string
    description: string
    isStock: string
  }[]
  loaded: boolean
}

export interface BasketSliceProps {
  basket: {
    code: string
    description: string
    image: string
    amountToBuy: number
    piecePrice: number
    totalPrice: number
    title: string
  }[]
  totalPrice: number
}
