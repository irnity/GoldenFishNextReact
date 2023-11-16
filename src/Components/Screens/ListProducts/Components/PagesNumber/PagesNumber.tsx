import React, { useState, useEffect } from 'react'
import classes from './PagesNumbers.module.css'
import { useRouter } from 'next/router'

interface PagesNumberProps {
  totalProducts: number | undefined
}

const PagesNumber = ({ totalProducts }: PagesNumberProps) => {
  const router = useRouter()
  const { page } = router.query

  const [pages, setPages] = useState<number[]>([1])
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    const num = Math.ceil((totalProducts ?? 0) / 9)

    setPages(() => {
      if (num <= 1) {
        return [1]
      } else {
        return Array.from({ length: num }, (_, index) => index + 1)
      }
    })

    if (page !== undefined) {
      setCurrentPage(parseInt(page as string))
    }
  }, [])

  const pageHandler = (pageNumber: number) => {
    void router.push({
      query: { ...router.query, page: pageNumber },
    })
    setCurrentPage(pageNumber)
  }

  if (totalProducts === undefined) return null

  return (
    <div className={classes.container}>
      {pages.map((pageNum) => {
        return (
          <button
            type="button"
            key={pageNum}
            className={
              pageNum === currentPage ? classes.active : classes.inactive
            }
            onClick={() => {
              pageHandler(pageNum)
            }}
          >
            <span>{pageNum}</span>
          </button>
        )
      })}
    </div>
  )
}

export default PagesNumber
