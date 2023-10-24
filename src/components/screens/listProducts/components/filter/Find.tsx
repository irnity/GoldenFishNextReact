import { FunctionComponent, useEffect, useState } from "react"
import classes from "./Find.module.css"
import { useRouter } from "next/router"

import * as React from "react"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"

interface FindProps {}

function valuetext(value: number) {
  return `${value}°C`
}

const minDistance = 50

const Find: FunctionComponent<FindProps> = () => {
  const router = useRouter()

  const { categoryId, page, inStock } = router.query

  const [stock, setStock] = useState({
    inStock: false,
    outStock: false,
  })

  useEffect(() => {
    const params = inStock ? inStock.split("-") : []
    setStock({
      inStock: params.includes("available"),
      outStock: params.includes("out_of_stock"),
    })
  }, [inStock])

  const addToQuery = (url: string) => {
    const params = inStock ? inStock.split("-") : []
    // create query
    if (!inStock) {
      router.replace({
        query: { ...router.query, inStock: `${url}` },
      })
      return
    }

    // remove url from query
    if (params.includes(url)) {
      params.splice(params.indexOf(url), 1)

      // if params is empty remove inStock from query
      if (params.length === 0) {
        const quary = { ...router.query }
        delete quary.inStock

        router.replace({
          query: quary,
        })
        return
      }

      // if params is not empty add params to query
      router.replace({
        query: { ...router.query, inStock: `${params.join("-")}` },
      })
      return
    }

    // add url to query
    router.replace({
      query: {
        ...router.query,
        inStock: `${inStock}-${url}`,
      },
    })
  }

  // slider
  const [value, setValue] = React.useState<number[]>([0, 55])

  const handleChange = (event: Event, newValue: number | number[]) => {
    console.log(value)
    setValue(newValue as number[])
  }

  return (
    <div className={classes.find}>
      <div className={classes.title}>
        <span>Стутус товару</span>
      </div>
      <div className={classes.options}>
        <div>
          <input
            type="checkbox"
            name="inStock"
            id="inStock"
            checked={stock.inStock}
            onChange={() => {
              addToQuery("available")
              setStock((prevState) => {
                return { ...prevState, inStock: !prevState.inStock }
              })
            }}
          />
          <label htmlFor="inStock">Є в наявності</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="outStock"
            checked={stock.outStock}
            id="outStock"
            onChange={() => {
              addToQuery("out_of_stock")
              setStock((prevState) => {
                return { ...prevState, outStock: !prevState.inStock }
              })
            }}
          />
          <label htmlFor="outStock">Немає в наявності</label>
        </div>
      </div>
      <Box sx={{ width: "90%" }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          disableSwap
          min={0}
          max={500}
        />
      </Box>
    </div>
  )
}

export default Find
