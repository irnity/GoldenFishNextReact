import classes from './Sort.module.css'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Sort = () => {
  const router = useRouter()

  const { sort } = router.query

  const [sortBy, setSortBy] = useState('popular')

  useEffect(() => {
    setSortBy(sort as string)
  }, [sort])

  const sortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === sortBy) return
    void router.replace({
      query: { ...router.query, sort: e.target.value },
    })
  }

  return (
    <div className={classes.container}>
      <select onChange={sortHandler} value={sortBy}>
        <option value={'popular'}>По рейтингу</option>
        <option value={'asc'}>Від дешевих до дорогих</option>
        <option value={'desc'}>Від дорогих до дешевих</option>
        {/* <option value={"rating"}>За кількістю відгуків</option> */}
      </select>
    </div>
  )
}

export default Sort
