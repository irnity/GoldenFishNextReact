export interface IProduct {
  id: string
  code: string
  title: string
  image: string
  price: number
  description: string
  inStock: string
  category: string
  totalComments: number
  totalRate: number
  params: Array<{
    name: string
    value: string
  }>
}

export interface IComment {
  id: string
  comment: string
  date: string
  email: string
  name: string
  negative: string
  positive: string
  rate: number
}

export interface IAuth {
  isLogedIn: boolean
  isAdmin: boolean
  firstName: string
  lastName: string
  surname: string
  phoneNumber: string
  email: string | null | undefined
  status: string | null
  error: string | null
  password: string
}

export interface IBasketSliceProps {
  basket: Array<{
    code: string
    description: string
    image: string
    amountToBuy: number
    totalPrice: number
    title: string
  }>
  totalPrice: number
  totalNumber: number
}