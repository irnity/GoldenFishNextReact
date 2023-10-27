import { FunctionComponent, useEffect, useState } from "react"
import classes from "./Price.module.css"
import { useRouter } from "next/router"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"
import CustomButton from "@/components/elements/customButton/CustomButton"
import CustomInput from "@/components/elements/customInput/CustomInput"

type Props = {}

let min = 0
let max = 5000

const Price = (props: Props) => {
  const router = useRouter()
  const { price } = router.query

  useEffect(() => {
    let params: string[] = []
    if (typeof price === "string") {
      params = price.split("-")
      setValue([+params[0], +params[1]])
    }
  }, [price])

  const [value, setValue] = useState<number[]>([min, max])
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

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
          max={5000}
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
          max={5000}
          value={value[1]}
        />
      </div>
      <Box sx={{ width: "80%" }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          disableSwap
          style={{ color: "rgb(33, 150, 243)" }}
          min={0}
          max={5000}
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
