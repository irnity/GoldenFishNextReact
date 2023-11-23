import React from 'react'
import classes from './BasketOverlay.module.css'
import CustomButton from '@/Components/Elements/CustomButton/CustomButton'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { FiX } from 'react-icons/fi'
import { type IBasketSliceProps } from '@/Redux/model'
import colors from '@/Assets/Styles/colors'
import BasketItems from '../BasketItems/BasketItems'

interface Props {
  onConfirm: () => void
}

const BasketOverlay = ({ onConfirm }: Props) => {
  const router = useRouter()

  const basketReduxState = useSelector(
    (state: { basket: IBasketSliceProps }) => state.basket
  )

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1>Кошик</h1>
        <button className={classes.cancel_button}>
          <FiX size={30} onClick={onConfirm} />
        </button>
      </div>
      <BasketItems handler={onConfirm} />
      {basketReduxState.basket.length > 0 && (
        <div className={classes.footer}>
          <div className={classes.continue}>
            <CustomButton
              type="button"
              handler={() => {}}
              text="Продовжити покупки"
              color={colors.Main_Blue_Color}
              border={`1px solid ${colors.Main_Blue_Color}`}
              backGroundColor={colors.Main_White_Color}
            />
          </div>

          <div className={classes.totalPrice_right}>
            <h1>{basketReduxState.totalPrice}&#8372; </h1>

            <CustomButton
              type="button"
              handler={() => {
                onConfirm()
                void router.push('/order')
              }}
              color={colors.Main_White_Color}
              backGroundColor={colors.Main_Blue_Color}
              text="Оформити замовлення"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default BasketOverlay
