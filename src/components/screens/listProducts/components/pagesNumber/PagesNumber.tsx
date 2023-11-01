import { FunctionComponent, useState, useEffect } from "react"
import classes from "./PagesNumbers.module.css"
import Link from "next/link"
import { useRouter } from "next/router"
import CustomButton from "@/components/elements/customButton/CustomButton"

interface PagesNumberProps {
  totalPages: number | undefined
}

const PagesNumber: FunctionComponent<PagesNumberProps> = ({ totalPages }) => {
  const router = useRouter()

  let { categoryId, page } = router.query as Object as {
    categoryId: string
    page: number
  }

  const [pages, setPages] = useState<number[]>([1])

  useEffect(() => {
    const num = Math.ceil(totalPages! / 9) | 0

    setPages(Array.from({ length: num }, (_, index) => index + 1))
    if (totalPages! <= 9) {
      setPages([])
    }
  }, [totalPages])

  if (!page) {
    page = 1
  }

  return (
    <div className={classes.cart}>
      {pages.map((pageNum) => {
        return (
          <button
            key={pageNum}
            className={pageNum === page ? classes.active : classes.inactive}
            type="button"
            onClick={() => {
              router.replace({
                query: { ...router.query, page: pageNum },
              })
            }}
          >
            <span>{pageNum.toString()}</span>
          </button>
        )
      })}
    </div>
  )
}

export default PagesNumber
