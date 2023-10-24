import { FunctionComponent, useEffect, useState } from "react"
import classes from "./Price.module.css"
import { useRouter } from "next/router"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"
import CustomButton from "@/components/elements/customButton/CustomButton"
import CustomInput from "@/components/elements/customInput/CustomInput"

type Props = {}

function valuetext(value: number) {
  return `${value}°C`
}

const min = 0
const max = 30000

const Price = (props: Props) => {
  // slider
  const [value, setValue] = useState<number[]>([min, max])

  const handleChange = (event: Event, newValue: number | number[]) => {
    console.log(value)
    setValue(newValue as number[])
  }

  const router = useRouter()

  const priceHandler = () => {
    router.replace({
      query: {
        ...router.query,
        price: `${value[0]}-${value[1]}`,
      },
    })
  }
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <span>Ціна</span>
      </div>
      <div className={classes.input}>
        <CustomInput
          type="number"
          placeholder={"0"}
          required={false}
          onChange={(e) => {
            if (+e.target.value > max) {
              setValue((prevState) => {
                return [max, prevState[1]]
              })
            } else {
              setValue((prevState) => {
                return [+e.target.value, prevState[1]]
              })
            }
          }}
          max={30000}
          value={value[0]}
        />
        <CustomInput
          type="number"
          placeholder={"0"}
          required={false}
          onChange={(e) => {
            if (+e.target.value > max) {
              setValue((prevState) => {
                return [prevState[0], max]
              })
            } else {
              setValue((prevState) => {
                return [prevState[0], +e.target.value]
              })
            }
          }}
          max={30000}
          value={value[1]}
        />
      </div>
      <Box sx={{ width: "80%" }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          disableSwap
          style={{ color: "rgb(33, 150, 243)" }}
          min={0}
          max={30000}
        />
      </Box>
      <div className={classes.button}>
        <CustomButton
          type="button"
          text="Застосувати"
          handler={priceHandler}
          backGroundColor="rgb(33, 150, 243)"
          color="#fff"
        />
      </div>
    </div>
  )
}

export default Price
