import React from 'react'
import classes from './ToggleItem.module.css'
import { type IProduct } from '@/redux/model'
import CustomButton from '@/components/elements/customButton/CustomButton'
import { FiShoppingCart } from 'react-icons/fi'
import useBasket from '@/hooks/basket-hook'

interface Props {
  product: IProduct
}

const ToggleList = ({ product }: Props) => {
  const { addProductToBasket } = useBasket()

  return (
    <div className={classes.container}>
      <div className={classes.params}>
        {product.params.slice(0, 1).map((param) => (
          <div key={param.name}>
            <span>{param.name}: </span>
            <span>{param.value}</span>
          </div>
        ))}
      </div>
      <div className={classes.buttons}>
        <div className={classes.button}>
          <CustomButton
            type="button"
            handler={() => {
              addProductToBasket(product)
            }}
            color="blue"
            backGroundColor="white"
            svg={<FiShoppingCart />}
          />
        </div>
      </div>
    </div>
  )
}

export default ToggleList
