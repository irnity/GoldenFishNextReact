import React, { FunctionComponent } from "react"
import classes from "./index.module.css"

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
  return (
    <div className={classes.home_block}>
      <div className={classes.home_text}>Welcome to Golden Fish</div>
    </div>
  )
}

export default HomePage
