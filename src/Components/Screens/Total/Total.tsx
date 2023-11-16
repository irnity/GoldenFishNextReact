import React, { type FunctionComponent } from 'react'
import classes from './Total.module.css'
import { type IProduct } from '@/redux/model'
import Link from 'next/link'

interface TotalProps {
  data: IProduct[]
}

const Total: FunctionComponent<TotalProps> = ({ data }) => {
  return (
    <div className={classes.cart}>
      <ul className={classes.list}>
        <li className={classes.row}>
          <div className={classes.info}>
            <span className={classes.number}>#</span>

            <span className={classes.title}>Назва</span>
            <span className={classes.code}>Код</span>
            <span className={classes.price}>Ціна</span>
            <span className={classes.description}>Опис</span>
          </div>
          <div className={classes.actions}>
            <span>Зменишити</span>
            <span className={classes.inStock}>Кількість</span>

            <span>Збільшити</span>
            <span>Видалити</span>
          </div>
        </li>
        {data.map((item, index) => (
          <li className={classes.row} key={item.id}>
            <div className={classes.info}>
              <span className={classes.number}>{index + 1}</span>

              <Link
                href={`/products/${item.category}/${item.id}`}
                className={classes.title}
              >
                {item.title}
              </Link>
              <span className={classes.code}>{item?.code}</span>
              <span className={classes.price}>{item.price}&#8372;</span>
              <span className={classes.description}>{item.description}</span>
            </div>
            <div className={classes.actions}>
              <button>-</button>
              <span
                style={{
                  border: 'none',
                }}
              >
                {item.inStock}
              </span>
              <button>+</button>
              <button>Видалити</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Total
