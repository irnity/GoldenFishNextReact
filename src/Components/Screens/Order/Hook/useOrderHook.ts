import { basketActions } from '@/Redux/basketSlice'
import { type IAuth, type IBasketSliceProps } from '@/Redux/model'
import { warningActions } from '@/Redux/warningSlice'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useOrderHook = () => {
  const baksetReduxState = useSelector(
    (state: { basket: IBasketSliceProps }) => state.basket
  )

  const authReduxState = useSelector((state: { auth: IAuth }) => state.auth)

  const dispatch = useDispatch()
  const router = useRouter()

  const [userCredentials, setUserCredentials] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '+38',
    address: '',
    email: '',
    paymentType: 'cash',
  })

  useEffect(() => {
    setUserCredentials({
      ...userCredentials,
      firstName: authReduxState.firstName ?? '',
      lastName: authReduxState.lastName ?? '',
      phoneNumber: authReduxState.phoneNumber ?? '',
      email: authReduxState.email ?? '',
      address: authReduxState.address ?? '',
    })
  }, [authReduxState])

  const firstNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserCredentials({
      ...userCredentials,
      firstName: event.target.value,
    })
  }

  const lastNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserCredentials({
      ...userCredentials,
      lastName: event.target.value,
    })
  }

  const phoneNumberHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 13) return
    setUserCredentials({
      ...userCredentials,
      phoneNumber: event.target.value,
    })
  }

  const addressHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserCredentials({
      ...userCredentials,
      address: event.target.value,
    })
  }

  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserCredentials({
      ...userCredentials,
      email: event.target.value,
    })
  }

  const paymentTypeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserCredentials({
      ...userCredentials,
      paymentType: event.target.value,
    })
  }

  const formOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const order = {
      ...userCredentials,
      ...baksetReduxState,
    }

    console.log(order)
    const responce = await fetch('/api/ordercreate', {
      method: 'POST',
      body: JSON.stringify(order),
    })

    const data = await responce.json()

    dispatch(
      warningActions.setWarning({ message: data.message, code: data.status })
    )

    if (data.status === 200) {
      void router.push('/')
      dispatch(basketActions.clearBasket())
    }
  }

  return {
    userCredentials,

    firstNameHandler,
    lastNameHandler,
    phoneNumberHandler,
    addressHandler,
    emailHandler,
    paymentTypeHandler,

    formOrder,
  }
}

export default useOrderHook
