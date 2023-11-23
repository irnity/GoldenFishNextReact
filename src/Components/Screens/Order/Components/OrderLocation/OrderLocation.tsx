import React from 'react'
import classes from './OrderLocation.module.css'
import CustomInput from '@/Components/Elements/CustomInput/CustomInput'

interface Props {
  userCredentials: {
    address: string
  }
  addressHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const OrderLocation = (props: Props) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h1>Адреса доставки</h1>
      </div>

      <div className={classes.input}>
        <CustomInput
          type="text"
          name="Самовивіз з Нової Пошти"
          required={true}
          value={props.userCredentials.address}
          onChange={props.addressHandler}
        />
      </div>
    </div>
  )
}

export default OrderLocation
