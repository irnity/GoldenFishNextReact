import classes from "./Sort.module.css"
import { FunctionComponent, useEffect, useState } from "react"
import sv from "../../../../svg/menu-grid-r-svgrepo-com.svg"
import Block from "@/assets/svg/Block"
import { useRouter } from "next/router"

interface SortProps {
  viewMode: string
  viewModeHandler: () => void
}

const Sort: FunctionComponent<SortProps> = ({ viewModeHandler }) => {
  const router = useRouter()
  const { categoryId } = router.query
  let { page, sort } = router.query

  console.log(categoryId, page, sort)

  const [sortBy, setSortBy] = useState("popular")

  useEffect(() => {
    if (sort === "asc") {
      setSortBy("asc")
      return
    }
    if (sort === "desc") {
      setSortBy("desc")
      return
    }
    if (sort === "rating") {
      setSortBy("rating")
      return
    } else {
      setSortBy("popular")
    }
  }, [sort])

  const sortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === sortBy) return
    router.push({
      pathname: `/products/${categoryId}`,
      query: { page: 1, sort: e.target.value },
    })
  }
  return (
    <div className={classes.cart}>
      <div className={classes.sort_box}>
        <div className={classes.filter}>
          <select onChange={(e) => sortHandler(e)} value={sortBy}>
            <option value={"popular"}>По рейтингу</option>
            <option value={"asc"}>Від дешевих до дорогих</option>
            <option value={"desc"}>Від дорогих до дешевих</option>
            <option value={"rating"}>За кількістю відгуків</option>
          </select>
        </div>
        {/* <div className={classes.shape}>
          <button>
            <Block />
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default Sort
