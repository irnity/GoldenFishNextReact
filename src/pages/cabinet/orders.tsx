// react
import Cart from '@/Components/Screens/Profile/Components/Cart/Cart'
import UserInfo from '@/Components/Screens/Profile/UserCredentials/Pages/UserInfo'
import UserOrders from '@/Components/Screens/Profile/UserOrders/UserOrders'
import React from 'react'

const PersonalInformationPage = () => {
  return (
    <Cart>
      <UserOrders />
    </Cart>
  )
}

export default PersonalInformationPage
