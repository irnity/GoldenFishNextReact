import React, { useEffect, useState } from 'react'
import classes from './Status.module.css'
import { useRouter } from 'next/router'

const Status = () => {
  const router = useRouter()

  const { inStock } = router.query

  const [stock, setStock] = useState({
    inStock: false,
    outStock: false,
  })

  useEffect(() => {
    let params: string[] = []
    if (typeof inStock === 'string') {
      params = inStock.split('-')
    }
    setStock({
      inStock: params.includes('available'),
      outStock: params.includes('out_of_stock'),
    })
  }, [inStock])

  const addToQuery = (url: string) => {
    let params: string[] = []

    if (typeof inStock === 'string') {
      params = inStock.split('-')
    }

    // create query
    if (inStock === undefined) {
      void router.replace({
        query: { ...router.query, inStock: `${url}` },
      })
      return
    }

    // remove url from query
    if (params.includes(url)) {
      params.splice(params.indexOf(url), 1)

      // if params is empty remove inStock from query
      if (params.length === 0) {
        const {
          query: { inStock, ...query },
        } = router

        void router.replace({
          query,
        })
        return
      }

      // if params is not empty add params to query
      void router.replace({
        query: { ...router.query, inStock: `${params.join('-')}` },
      })
      return
    }

    // add url to query
    void router.replace({
      query: {
        ...router.query,
        inStock: `${(inStock as string) + '-' + url}`,
      },
    })
  }

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h1>Стутус товару</h1>
      </div>
      <div className={classes.options}>
        <div className={classes.available}>
          <input
            type="checkbox"
            name="inStock"
            id="inStock"
            checked={stock.inStock}
            onChange={() => {
              addToQuery('available')
              setStock((prevState) => ({
                ...prevState,
                inStock: !prevState.inStock,
              }))
            }}
          />
          <label htmlFor="inStock">
            <span>Є в наявності</span>
          </label>
        </div>
        <div className={classes.outStock}>
          <input
            type="checkbox"
            name="outStock"
            checked={stock.outStock}
            id="outStock"
            onChange={() => {
              addToQuery('out_of_stock')
              setStock((prevState) => ({
                ...prevState,
                outStock: !prevState.inStock,
              }))
            }}
          />
          <label htmlFor="outStock">
            <span>Немає в наявності</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default Status
