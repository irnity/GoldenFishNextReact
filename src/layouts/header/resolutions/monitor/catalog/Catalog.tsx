import { useState, FunctionComponent } from "react"
import Category from "../catalog/category/Category"
import classes from "./Catalog.module.css"
import { CSSTransition } from "react-transition-group"

import { Information } from "./Information"
import Links from "./links/Links"

interface CatalogProps {}

const animationTiming = {
  enter: 300,
  exit: 300,
}

const Catalog: FunctionComponent<CatalogProps> = () => {
  const [toggleNavigation, setToggleNavigation] = useState(false)
  const [list, setList] = useState<{ name: string; url: string }[]>([])

  const toggleNavigationHandler = (data: { name: string; url: string }[]) => {
    // check if list has data or its new data
    // if new then update list
    if (JSON.stringify(list) !== JSON.stringify(data)) {
      setToggleNavigation((prevState) => (prevState = true))
      setList(data)
    }
    // if new data === old data then catalog will be closed
    else {
      fadeOut()
    }
  }

  function fadeOut() {
    setToggleNavigation((prevState) => (prevState = false))
    setList((prevState) => (prevState = []))
  }

  return (
    <div className={classes.block}>
      <div className={classes.catalog}>
        {/* categorys */}
        {Information.map((data) => (
          <Category
            key={data.name}
            toggleNavigationHandler={toggleNavigationHandler}
            title={data.name}
            catalog={data.catalog}
          />
        ))}
      </div>
      {toggleNavigation && (
        <div className={classes.background} onClick={fadeOut}></div>
      )}
      <CSSTransition
        in={toggleNavigation}
        timeout={animationTiming}
        mountOnEnter
        unmountOnExit
        classNames={{
          enterActive: classes.fade_slide_enter_active,
          exitActive: classes.fade_slide_exit_active,
        }}
      >
        <div className={classes.catalog_block}>
          <div className={classes.catalog_link}>
            {/* links  */}
            {list.map((catalog, index) => (
              <Links key={index} fadeOut={fadeOut} catalog={catalog} />
            ))}
          </div>
        </div>
      </CSSTransition>
    </div>
  )
}

export default Catalog
