import { FunctionComponent, useState, useEffect } from "react"
import classes from "./PagesNumbers.module.css"
import Link from "next/link"
import { useRouter } from "next/router"

interface PagesNumberProps {
  totalPages: number
}

const PagesNumber: FunctionComponent<PagesNumberProps> = ({ totalPages }) => {
  const router = useRouter()

  const { categoryId, page } = router.query as Object as {
    categoryId: string
    page: number
  }

  const [pages, setPages] = useState<number[]>([1])

  useEffect(() => {
    const num = Math.ceil(totalPages / 9)

    setPages(Array.from({ length: num }, (_, index) => index + 1))
  }, [totalPages])

  return (
    <div className={classes.cart}>
      {pages.map((pageNum) => {
        return (
          <div
            key={pageNum}
            className={page == pageNum ? classes.selected : classes.unselected}
          >
            <Link
              href={{
                pathname: `${categoryId}`,
                query: { page: `${pageNum}` },
              }}
              className={page == pageNum ? classes.disabled : classes.link}
            >
              <span>{pageNum}</span>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default PagesNumber
