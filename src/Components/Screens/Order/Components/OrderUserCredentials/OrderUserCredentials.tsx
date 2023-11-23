import React from 'react'
import classes from './OrderUserCredentials.module.css'
import CustomInput from '@/Components/Elements/CustomInput/CustomInput'

interface Props {
  userCredentials: {
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
  }
  firstNameHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
  lastNameHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
  phoneNumberHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
  emailHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const OrderUserCredentials = (props: Props) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h1>Ваші контактні дані</h1>
      </div>
      <div className={classes.inputs}>
        <CustomInput
          type="text"
          name="Прізвище"
          required={true}
          value={props.userCredentials.lastName}
          onChange={props.lastNameHandler}
        />
        <CustomInput
          type="text"
          name="Ім'я"
          required={true}
          value={props.userCredentials.firstName}
          onChange={props.firstNameHandler}
        />
        <CustomInput
          type="text"
          name="Номер телефону"
          required={true}
          value={props.userCredentials.phoneNumber}
          onChange={props.phoneNumberHandler}
        />
        <CustomInput
          type="email"
          name="Електронна пошта"
          required={true}
          value={props.userCredentials.email}
          onChange={props.emailHandler}
        />
      </div>
    </div>
  )
}

export default OrderUserCredentials
