import { FunctionComponent } from "react"
import classes from "./Card.module.css"

interface CardProps {
  children: React.ReactNode
}

const Card: FunctionComponent<CardProps> = ({ children }) => {
  return <main className={classes.card}>{children}</main>
}

export default Card
