import React, { useEffect, useState } from 'react'
import classes from './Price.module.css'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import CustomButton from '@/Components/Elements/CustomButton/CustomButton'
import CustomInput from '@/Components/Elements/CustomInput/CustomInput'
import colors from '@/Assets/styles/colors'

const min = 0
const max = 5000

const Price = () => {
  const router = useRouter()
  const { price } = router.query

  // get price from url and set it to slider
  useEffect(() => {
    let params: string[] = []
    if (typeof price === 'string') {
      params = price.split('-')
      setValue([+params[0], +params[1]])
    }
  }, [price])

  // slider value
  const [value, setValue] = useState<number[]>([min, max])

  const sliderHandler = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  const priceInputHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'lowest' | 'highest'
  ) => {
    const newValue = +e.target.value
    if (type === 'lowest') {
      setValue((prevState) => {
        if (newValue > prevState[1]) {
          return [prevState[1], prevState[1]]
        } else {
          return [newValue, prevState[1]]
        }
      })
    } else if (type === 'highest') {
      setValue((prevState) => {
        if (newValue < prevState[0]) {
          return [prevState[0], prevState[0]]
        } else if (newValue > max) {
          return [prevState[0], max]
        } else {
          return [prevState[0], newValue]
        }
      })
    }
  }

  const priceHandler = () => {
    void router.replace({
      query: {
        ...router.query,
        price: `${value[0]}-${value[1]}`,
      },
    })
  }

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h1>Ціна</h1>
      </div>
      <div className={classes.input}>
        <CustomInput
          type="number"
          placeholder={'0'}
          required={false}
          onChange={(e) => {
            priceInputHandler(e, 'lowest')
          }}
          max={5000}
          value={value[0]}
        />
        <CustomInput
          type="number"
          placeholder={'0'}
          required={false}
          onChange={(e) => {
            priceInputHandler(e, 'highest')
          }}
          max={5000}
          value={value[1]}
        />
      </div>
      <Box sx={{ width: '90%' }}>
        <Slider
          getAriaLabel={() => 'Price range'}
          value={value}
          onChange={sliderHandler}
          valueLabelDisplay="auto"
          disableSwap
          style={{ color: colors.Main_Blue_Color }}
          min={0}
          max={5000}
        />
      </Box>
      <CustomButton
        type="button"
        text="Застосувати"
        handler={priceHandler}
        backGroundColor={colors.Main_Blue_Color}
        color={colors.Main_White_Color}
      />
    </div>
  )
}

export default Price
