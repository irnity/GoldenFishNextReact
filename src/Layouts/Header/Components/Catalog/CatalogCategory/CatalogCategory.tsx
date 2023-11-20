import React from 'react'
import classes from './CatalogCategory.module.css'
import { FiChevronRight } from 'react-icons/fi'

interface Props {
  category: Array<{
    name: string
  }>
  categoryHandler: (name: string) => void
  selectedCategory: string
}

const CatalogCategory = ({
  category,
  selectedCategory,
  categoryHandler,
}: Props) => {
  return (
    <div className={classes.container}>
      {category.map((data) => (
        <div
          key={data.name}
          className={
            data.name === selectedCategory
              ? classes.item_selected
              : classes.item_not_selected
          }
          onMouseEnter={() => {
            categoryHandler(data.name)
          }}
        >
          <h1>{data.name}</h1>
          <FiChevronRight size={20} />
        </div>
      ))}
    </div>
  )
}

export default CatalogCategory
