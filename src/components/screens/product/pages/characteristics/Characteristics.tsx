import React, { FunctionComponent } from "react"
import classes from "./Characteristics.module.css"
import { IProduct } from "@/redux/model"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"

interface CharacteristicsProps {
  characteristics?: any
}

const Characteristics: FunctionComponent<CharacteristicsProps> = ({
  characteristics,
}) => {
  const router = useRouter()
  let section = ""

  if (router.pathname.split("/")[4] === "characteristics") {
    section = characteristics.title
  }

  let comments = characteristics.params
  if (comments === undefined) comments = []

  return (
    <div className={classes.cart}>
      <div className={classes.title}>
        <h2>Характеристики {section}</h2>
      </div>
      {comments.map((item: any) => (
        <div className={classes.info} key={item.name}>
          <div className={classes.row}>
            <p className={classes.name}>
              <span>{item.name}</span>
            </p>
            <p className={classes.value}>{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Characteristics
