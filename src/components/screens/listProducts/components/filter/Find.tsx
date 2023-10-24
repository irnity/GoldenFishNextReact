import { FunctionComponent, useEffect, useState } from "react"
import classes from "./Find.module.css"
import { useRouter } from "next/router"

interface FindProps {}

const minDistance = 50

const Find: FunctionComponent<FindProps> = () => {
  const router = useRouter()

  const { categoryId, page, inStock } = router.query

  const [stock, setStock] = useState({
    inStock: false,
    outStock: false,
  })

  useEffect(() => {
    let params: string[] = []
    if (typeof inStock === "string") {
      params = inStock.split("-")
    }
    setStock({
      inStock: params.includes("available"),
      outStock: params.includes("out_of_stock"),
    })
  }, [inStock])

  const addToQuery = (url: string) => {
    let params: string[] = []
    if (typeof inStock === "string") {
      params = inStock.split("-")
    }
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
    </div>
  )
}

export default Find
